import sys
from PIL import Image, ImageDraw, ImageFilter

def make_laptop(shot_path, out_path):
    W,H = 1492,1062
    canvas = Image.new('RGBA',(W,H),(0,0,0,0))
    # ---- soft shadow ----
    sh = Image.new('RGBA',(W,H),(0,0,0,0)); ds=ImageDraw.Draw(sh)
    ds.rounded_rectangle([180,markH:=300,W-180,H-150],radius=40,fill=(0,0,0,90))
    sh = sh.filter(ImageFilter.GaussianBlur(38))
    canvas.alpha_composite(sh)
    d = ImageDraw.Draw(canvas)
    # ---- screen body (dark bezel) ----
    bx0,by0,bx1,by1 = 156,60,1336,812           # 1180 x 752
    d.rounded_rectangle([bx0,by0,bx1,by1],radius=26,fill=(13,13,13,255))
    d.rounded_rectangle([bx0,by0,bx1,by1],radius=26,outline=(40,40,40,255),width=2)
    # camera dot
    d.ellipse([W//2-5,by0+14,W//2+5,by0+24],fill=(60,60,66,255))
    # ---- screenshot into inner screen ----
    inx0,iny0 = bx0+20, by0+40
    inw,inh = (bx1-bx0)-40, (by1-by0)-60        # 1140 x 692
    shot = Image.open(shot_path).convert('RGB')
    # cover-fit
    sr, tr = shot.width/shot.height, inw/inh
    if sr>tr:
        nh=inh; nw=int(inh*sr)
    else:
        nw=inw; nh=int(inw/sr)
    shot=shot.resize((nw,nh),Image.LANCZOS)
    shot=shot.crop(((nw-inw)//2,(nh-inh)//2,(nw-inw)//2+inw,(nh-inh)//2+inh))
    mask=Image.new('L',(inw,inh),0); ImageDraw.Draw(mask).rounded_rectangle([0,0,inw,inh],radius=10,fill=255)
    canvas.paste(shot,(inx0,iny0),mask)
    # ---- base / deck ----
    d.rounded_rectangle([86,812,1406,854],radius=14,fill=(206,210,216,255))
    d.rounded_rectangle([86,844,1406,856],radius=10,fill=(168,172,179,255))
    # hinge notch
    d.rounded_rectangle([W//2-70,812,W//2+70,828],radius=10,fill=(150,154,161,255))
    canvas.save(out_path)
    print("saved",out_path,canvas.size)

if __name__=='__main__':
    make_laptop(sys.argv[1],sys.argv[2])
