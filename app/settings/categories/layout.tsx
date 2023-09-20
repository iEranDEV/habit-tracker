export default function SettingsCategoriesLayout(props: {
    children: React.ReactNode
    modal: React.ReactNode
}) {

    return (
        <>
            {props.children}
            {props.modal}
        </>
    )
}