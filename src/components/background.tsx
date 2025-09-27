import grid from '@/../assets/worship.png';
import Image from 'next/image';

export default function Background() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <Image
                alt='Background Image'
                src={grid}
                placeholder='blur'
                quality={100}
                sizes='100vw'
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </div>
    );
}
