type ColorPickerProps = {
    color: string,
    setColor: Function
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {

    const colors = ['#ef4444', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#84cc16']

    return (
        <div className="w-full grid grid-cols-7 pl-2 gap-2">
            {colors.map((item) => {
                console.log(item)
                return <div key={item} className="w-full rounded-lg aspect-square" style={{ background: item }}></div>
            })}
        </div>
    )
}