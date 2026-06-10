
import os
from PIL import Image

def convert_images_to_webp():
    # 获取当前脚本文件所在的绝对路径
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    print(f"当前运行目录: {current_dir}")
    print("正在检索符合条件的文件...\n")
    
    success_count = 0
    
    # 遍历当前文件夹中的所有文件
    for filename in os.listdir(current_dir):
        # 检查是否以“作品”开头，并且是 JPG 或 PNG 格式（忽略大小写）
        if filename.startswith("作品") and filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            source_path = os.path.join(current_dir, filename)
            
            # 生成新的文件名（保留原名，仅更换后缀为 .webp）
            file_stem = os.path.splitext(filename)[0]
            target_filename = f"{file_stem}.webp"
            target_path = os.path.join(current_dir, target_filename)
            
            try:
                # 打开并转换图片
                with Image.open(source_path) as img:
                    # 如果是 PNG 且包含透明通道，Pillow 会自动处理；RGB 也会正常转换
                    img.save(target_path, "WEBP")
                print(f"【成功】{filename} -> {target_filename}")
                success_count += 1
            except Exception as e:
                print(f"【失败】转换 {filename} 时出错: {e}")
                
    print(f"\n处理完毕！成功转换了 {success_count} 张图片。")

if __name__ == "__main__":
    convert_images_to_webp()
    # 防止双击运行时控制台闪退，方便查看结果
    input("\n按下回车键退出...")