import React from 'react'
import spinner from '../images/loading_spinner.gif'
const CustomButton = ({isLoading, onClick = () =>{}, title, icon, style}) => {
    const LoadingSpinner = () =>{
        return (
            <img src={spinner} className='img-spinner' />
        )
    }
    
    const ContentBtn = () =>{
        return (
            <div className='flex flex-row'>
                <span>{title}</span>
                {icon}
            </div>
        )
    }
    var styles = style+' transition-all hover:bg-opacity-90 btn btn-component w-full rounded-md p-2 flex flex-col items-center justify-center'
  return (
    <button disabled={isLoading === true ? true : false} className={styles} onClick={onClick}>
        {isLoading ? <LoadingSpinner/> : <ContentBtn />}
    </button>
  )
}


export default CustomButton