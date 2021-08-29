precision mediump float;

uniform vec4 globalColor;
uniform float power; // 発光係数
varying float vPointId;

void main(){
    float dest = 0.0;
    
    // １．gl_PointCoord.st の原点を中心に移動させる
    vec2 p = gl_PointCoord.st * 2.0 - 1.0;

    if(vPointId > 600.0)
    {
        // ２．原点からの距離を測る
        float len = length(p);
        // ３．光ったような効果を得たいのでベクトルの長さを除数として使う
        dest = power / len;
        // ４．外縁は完全に透明になってほしいので原点から遠いほど暗くする
        dest *= max(1.0 - len, 0.0);
        // 5. 模様を形成する(格子状)
        vec2 q = p * 10.0;
        dest *= mod(floor(q.x) + floor(q.y), 2.0);
    }
    else if(vPointId > 300.0)
    {
        // ２．原点からの距離を測る
        float len = length(p);
        // ３．光ったような効果を得たいのでベクトルの長さを除数として使う
        dest = power / len;
        // ４．外縁は完全に透明になってほしいので原点から遠いほど暗くする
        dest *= max(1.0 - len, 0.0);
        // 5. 模様を形成する（縦縞）
        dest *= mod(floor(p.x * 10.0), 2.0);
    }
    else
    {
        // ２．原点からの距離を測る
        float len = length(p);
        // ３．光ったような効果を得たいのでベクトルの長さを除数として使う
        dest = power / len;
        // ４．外縁は完全に透明になってほしいので原点から遠いほど暗くする
        dest *= max(1.0 - len, 0.0);
        // 5. 模様を形成する（横縞）
        dest *= mod(floor(p.y * 10.0), 2.0);
    }

    gl_FragColor = vec4(vec3(dest), 1.0) * globalColor;
}

