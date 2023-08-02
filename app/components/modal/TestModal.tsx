import Modal from "./Modal";
import Values from 'values.js'

export default function TestModal() {

    const r = 175;
    const g = 14;
    const b = 207;

    const y =  0.2126 * r + 0.7152 * g + 0.0722 * b;
    const light = r + g + b >= (255 * 1.5) ? 'true' : 'false';

    const getRGB = (r: number, g: number, b: number) => {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    const color = new Values('#f5ddce');

    return (
        <Modal title="Test">
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-10" style={{ backgroundColor: '#f5ddce' }}></div>
                <div className="w-full h-10" style={{ backgroundColor: color.tints(10)[7].hexString() }}></div>

                <div className="mt-8 flex flex-col gap-2">
                    <p>y: {color.getBrightness()}</p>
                    <p>bglight: {color.getBrightness() > 85 ? 'false' : 'true'}</p>
                </div>
            </div>
        </Modal>
    )
}