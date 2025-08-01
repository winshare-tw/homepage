#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自動更新實績案例數據的腳本
讀取 realcase/*/realcase-*.txt 文件並生成 JavaScript 數據
"""

import os
import json

def read_case_data():
    """讀取所有案例數據"""
    cases_data = []
    
    # 掃描 realcase 目錄
    realcase_dir = "realcase"
    if not os.path.exists(realcase_dir):
        print(f"錯誤: {realcase_dir} 目錄不存在")
        return cases_data
    
    # 獲取所有子目錄並排序
    folders = sorted([f for f in os.listdir(realcase_dir) 
                     if os.path.isdir(os.path.join(realcase_dir, f)) and f.isdigit()])
    
    for folder in folders:
        folder_path = os.path.join(realcase_dir, folder)
        title_file = os.path.join(folder_path, "realcase-title.txt")
        desc_file = os.path.join(folder_path, "realcase-desc.txt")
        
        # 讀取標題
        title = f"案例 {folder}"  # 預設標題
        if os.path.exists(title_file):
            try:
                with open(title_file, 'r', encoding='utf-8') as f:
                    title = f.read().strip()
                print(f"✓ 讀取標題: {folder} -> {title}")
            except Exception as e:
                print(f"✗ 讀取標題失敗 {title_file}: {e}")
        else:
            print(f"⚠ 標題文件不存在: {title_file}")
        
        # 讀取描述
        description = f"案例 {folder} 的描述"  # 預設描述
        if os.path.exists(desc_file):
            try:
                with open(desc_file, 'r', encoding='utf-8') as f:
                    description = f.read().strip()
                print(f"✓ 讀取描述: {folder} -> {description[:50]}...")
            except Exception as e:
                print(f"✗ 讀取描述失敗 {desc_file}: {e}")
        else:
            print(f"⚠ 描述文件不存在: {desc_file}")
        
        # 添加到數據中
        case_data = {
            "title": title,
            "description": description,
            "image": f"realcase/{folder}/realcase.png",
            "folder": folder
        }
        cases_data.append(case_data)
        print(f"✓ 案例 {folder} 數據準備完成")
    
    return cases_data

def generate_js_data(cases_data):
    """生成 JavaScript 數據字串"""
    js_array = "[\n"
    for i, case in enumerate(cases_data):
        js_array += "            {\n"
        js_array += f'                title: "{case["title"]}",\n'
        js_array += f'                description: "{case["description"]}",\n'
        js_array += f'                image: "{case["image"]}",\n'
        js_array += f'                folder: "{case["folder"]}"\n'
        js_array += "            }"
        if i < len(cases_data) - 1:
            js_array += ","
        js_array += "\n"
    js_array += "        ]"
    return js_array

def update_html_file(js_data):
    """更新 HTML 文件中的數據"""
    html_file = "index.html"
    
    if not os.path.exists(html_file):
        print(f"錯誤: {html_file} 不存在")
        return False
    
    # 讀取 HTML 文件
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"錯誤: 無法讀取 {html_file}: {e}")
        return False
    
    # 找到要替換的區塊
    start_marker = "let realCasesData = ["
    end_marker = "        ];"
    
    start_pos = content.find(start_marker)
    if start_pos == -1:
        print("錯誤: 找不到 realCasesData 數組開始位置")
        return False
    
    end_pos = content.find(end_marker, start_pos)
    if end_pos == -1:
        print("錯誤: 找不到 realCasesData 數組結束位置")
        return False
    
    # 替換數據
    new_content = (content[:start_pos] + 
                   "let realCasesData = " + js_data + ";" +
                   content[end_pos + len(end_marker):])
    
    # 寫入文件
    try:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✓ 成功更新 {html_file}")
        return True
    except Exception as e:
        print(f"錯誤: 無法寫入 {html_file}: {e}")
        return False

def main():
    print("🚀 開始更新實績案例數據...")
    print("=" * 50)
    
    # 讀取案例數據
    cases_data = read_case_data()
    
    if not cases_data:
        print("❌ 沒有找到任何案例數據")
        return
    
    print(f"\n📊 找到 {len(cases_data)} 個案例")
    print("=" * 50)
    
    # 生成 JavaScript 數據
    js_data = generate_js_data(cases_data)
    
    # 更新 HTML 文件
    if update_html_file(js_data):
        print("\n🎉 更新完成！")
        print("現在可以直接打開 index.html 查看更新後的內容")
    else:
        print("\n❌ 更新失敗")
    
    print("=" * 50)

if __name__ == "__main__":
    main()
