# asset/characters/*.png -> js/characters-data.js (공유 이미지용 캐릭터 그림)
# 사용: python3 tools/make-characters-js.py  (Pillow 필요) 후 npm run build
from PIL import Image
import base64, io, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
ids = ['vlog', 'entertain', 'game', 'beauty', 'knowledge', 'music', 'sports', 'news']
lines = ['// 공유 이미지(JPG)용 캐릭터 그림. 파일 주소 대신 글자로 넣어 두어야',
         '// index.html을 더블클릭해 연 경우(file://)에도 이미지 저장 때 캐릭터가 빠지지 않는다.',
         '// asset/characters/*.png 를 바꾸면 tools/make-characters-js.py 로 다시 만든다.',
         'export const CHARACTER_DATA = {']
for i in ids:
    im = Image.open(root / 'asset' / 'characters' / f'{i}.png').convert('RGBA')
    im.thumbnail((320, 320), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=88, method=6)
    lines.append(f"  {i}: 'data:image/webp;base64,{base64.b64encode(buf.getvalue()).decode()}',")
lines.append('};\n')
(root / 'js' / 'characters-data.js').write_text('\n'.join(lines), encoding='utf-8')
print('js/characters-data.js 생성 완료')
