# -*- coding: utf-8 -*-
import openpyxl
import re
import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

def extract_number(code):
    match = re.search(r'(\d+)', code)
    return int(match.group(1)) if match else 0

def safe_int(val):
    if val is None:
        return 0
    try:
        return int(val)
    except (ValueError, TypeError):
        return 0

# Create output directories
os.makedirs('images/toilet', exist_ok=True)
os.makedirs('images/faucet', exist_ok=True)
os.makedirs('images/cabinet', exist_ok=True)

# ===================== TOILET =====================
print("=== Processing toilet ===")
wb = openpyxl.load_workbook('tutu马桶报价表.xlsx')
ws = wb['卫浴陶瓷']

toilet_products = []
toilet_image_map = {}

# First pass: identify all products
for row_idx in range(4, ws.max_row + 1):
    a_val = ws.cell(row=row_idx, column=1).value
    c_val = ws.cell(row=row_idx, column=3).value
    d_val = ws.cell(row=row_idx, column=4).value
    e_val = ws.cell(row=row_idx, column=5).value
    f_val = ws.cell(row=row_idx, column=6).value

    if not d_val and not c_val:
        continue

    seq = int(a_val) if a_val else None
    model = str(c_val).strip() if c_val else ""
    name = str(d_val).strip().replace('\n', ' ') if d_val else ""
    spec = str(e_val).strip() if e_val else ""
    price = safe_int(f_val)

    if '立柱盆' in name:
        ptype = '立柱盆'
    elif '蹲便器' in name:
        ptype = '蹲便器'
    elif '马桶' in name:
        ptype = '马桶'
    else:
        ptype = '卫浴陶瓷'

    product_id = "TU-{}".format(seq) if seq else "TU-{}".format(model)

    toilet_products.append({
        "id": product_id,
        "model": model,
        "name": name,
        "spec": spec,
        "type": ptype,
        "price": price,
        "_row": row_idx
    })

# Second pass: map images to products
for img in ws._images:
    anchor = img.anchor
    if hasattr(anchor, '_from'):
        row = anchor._from.row + 1
        col = anchor._from.col + 1
        if col == 2:  # Column B
            for p in toilet_products:
                if p['_row'] == row:
                    try:
                        img_ref = img.ref
                        if hasattr(img_ref, 'read'):
                            blob = img_ref.read()
                        elif hasattr(img_ref, 'blob'):
                            blob = img_ref.blob
                        else:
                            blob = img_ref

                        fmt = img.format if hasattr(img, 'format') else 'png'
                        filename = "images/toilet/toilet_{}.{}".format(p['id'], fmt)
                        with open(filename, 'wb') as f:
                            f.write(blob)
                        toilet_image_map[p['id']] = filename
                        print("  {}: {} -> {}".format(p['id'], p['name'], filename))
                    except Exception as e:
                        print("  Error for {}: {}".format(p['id'], e))
                    break

for p in toilet_products:
    del p['_row']

# ===================== FAUCET =====================
print("\n=== Processing faucet ===")
wb2 = openpyxl.load_workbook('202603.xlsx')
ws2 = wb2['Sheet1']

faucet_products = []
faucet_image_map = {}

# First pass: identify all products
seen_codes = set()
for row_idx in range(2, ws2.max_row + 1):
    b_val = ws2.cell(row=row_idx, column=2).value
    c_val = ws2.cell(row=row_idx, column=3).value
    e_val = ws2.cell(row=row_idx, column=5).value

    if not e_val:
        continue

    code = str(e_val).strip()
    desc = str(b_val).strip().replace('\n', ' ') if b_val else ""
    price = safe_int(c_val)

    num = extract_number(code)

    if 5000 <= num <= 5999:
        ptype = '厨房龙头'
    elif 4000 <= num <= 4999:
        ptype = '面盆龙头'
    elif 6000 <= num <= 6999:
        ptype = '冷热龙头'
    elif 3000 <= num <= 3999:
        ptype = '单冷龙头'
    elif 1000 <= num <= 1999:
        ptype = '手轮龙头'
    elif 7700 <= num <= 7799:
        ptype = '软管'
    elif 7000 <= num <= 7699:
        ptype = '花洒龙头'
    elif 5500 <= num <= 5599:
        ptype = '配件'
    elif 9000 <= num <= 9999:
        ptype = '下水配件'
    elif 8000 <= num <= 8099:
        ptype = '不锈钢件'
    elif 8600 <= num <= 8699:
        ptype = '淋浴管'
    elif num in [2005, 2006]:
        ptype = '即热'
    elif 2000 <= num <= 2099:
        ptype = '淋浴套装'
    else:
        ptype = '龙头'

    unique_id = code
    if code in seen_codes:
        unique_id = "{}-R{}".format(code, row_idx)
    seen_codes.add(code)

    faucet_products.append({
        "id": unique_id,
        "code": code,
        "desc": desc,
        "type": ptype,
        "price": price,
        "_row": row_idx
    })

# Second pass: map images to products
for img in ws2._images:
    anchor = img.anchor
    if hasattr(anchor, '_from'):
        row = anchor._from.row + 1
        col = anchor._from.col + 1
        if col == 1:  # Column A
            for p in faucet_products:
                if p['_row'] == row:
                    try:
                        img_ref = img.ref
                        if hasattr(img_ref, 'read'):
                            blob = img_ref.read()
                        elif hasattr(img_ref, 'blob'):
                            blob = img_ref.blob
                        else:
                            blob = img_ref

                        fmt = img.format if hasattr(img, 'format') else 'png'
                        filename = "images/faucet/faucet_{}.{}".format(p['id'], fmt)
                        with open(filename, 'wb') as f:
                            f.write(blob)
                        faucet_image_map[p['id']] = filename
                        print("  {}: {} -> {}".format(p['id'], p['desc'][:30], filename))
                    except Exception as e:
                        print("  Error for {}: {}".format(p['id'], e))
                    break

for p in faucet_products:
    del p['_row']

# ===================== CABINET =====================
print("\n=== Processing cabinet ===")
wb3 = openpyxl.load_workbook('浴室柜.xlsx')
ws3 = wb3['Bathroom浴室柜']

cabinet_products = []
cabinet_image_map = {}

# First pass: identify all products
for row_idx in range(2, ws3.max_row + 1):
    b_val = ws3.cell(row=row_idx, column=2).value
    c_val = ws3.cell(row=row_idx, column=3).value
    d_val = ws3.cell(row=row_idx, column=4).value

    if not b_val:
        continue

    model = str(b_val).strip()
    if isinstance(c_val, str):
        price = 0
        spec_price = c_val.strip()
    else:
        price = int(c_val) if c_val else 0
        spec_price = ""

    spec = str(d_val).strip() if d_val else ""
    if spec_price:
        spec = "{} {}".format(spec, spec_price) if spec else spec_price

    seq = row_idx - 1
    product_id = "YC-{}".format(seq)

    if '支架' in model:
        ptype = '支架'
    else:
        ptype = '浴室柜'

    cabinet_products.append({
        "id": product_id,
        "model": model,
        "name": model,
        "spec": spec,
        "type": ptype,
        "price": price,
        "_row": row_idx
    })

# Second pass: map images to products (first image per row)
processed_rows = set()
for img in ws3._images:
    anchor = img.anchor
    if hasattr(anchor, '_from'):
        row = anchor._from.row + 1
        col = anchor._from.col + 1
        if col == 1 and row > 1 and row not in processed_rows:  # Column A, skip header
            processed_rows.add(row)
            for p in cabinet_products:
                if p['_row'] == row:
                    try:
                        img_ref = img.ref
                        if hasattr(img_ref, 'read'):
                            blob = img_ref.read()
                        elif hasattr(img_ref, 'blob'):
                            blob = img_ref.blob
                        else:
                            blob = img_ref

                        fmt = img.format if hasattr(img, 'format') else 'png'
                        filename = "images/cabinet/cabinet_{}.{}".format(p['id'], fmt)
                        with open(filename, 'wb') as f:
                            f.write(blob)
                        cabinet_image_map[p['id']] = filename
                        print("  {}: {} -> {}".format(p['id'], p['name'], filename))
                    except Exception as e:
                        print("  Error for {}: {}".format(p['id'], e))
                    break

for p in cabinet_products:
    del p['_row']

# ===================== SAVE =====================
products = {
    "toilet": toilet_products,
    "faucet": faucet_products,
    "cabinet": cabinet_products
}

with open('products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("\n=== Summary ===")
print("  Toilet: {} products, {} images".format(len(toilet_products), len(toilet_image_map)))
print("  Faucet: {} products, {} images".format(len(faucet_products), len(faucet_image_map)))
print("  Cabinet: {} products, {} images".format(len(cabinet_products), len(cabinet_image_map)))

# Show products without images
print("\n=== Products without images ===")
for p in toilet_products:
    if p['id'] not in toilet_image_map:
        print("  Toilet: {} - {}".format(p['id'], p['name']))
for p in faucet_products:
    if p['id'] not in faucet_image_map:
        print("  Faucet: {} - {}".format(p['id'], p.get('desc', '')[:30]))
for p in cabinet_products:
    if p['id'] not in cabinet_image_map:
        print("  Cabinet: {} - {}".format(p['id'], p['name']))
