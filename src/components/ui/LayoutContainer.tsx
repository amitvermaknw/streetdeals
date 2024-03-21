


const buildForm = (formElement) => {

}

const LayoutContainer = (props) => {
    return (<>
        {props.length ? buildForm(props) : ''}
    </>)
}

export default LayoutContainer;