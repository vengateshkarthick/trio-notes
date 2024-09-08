function Toast({ show }: { show: boolean}){


    return (
        <div className="toast" style={{ display: show ? "flex" : "none"}}>
           Successfully deleted
        </div>
    )

}

export default Toast