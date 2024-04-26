

function Love({ isActive } : { isActive : boolean }) {
    return (
        <svg width="21" height="18" viewBox="0 0 21 18" fill={isActive ? "#7209B7" : "none"} xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6009 17L2.5379 9.63024C-1.84418 5.20839 4.59749 -3.28158 10.6009 3.58704C16.6044 -3.28158 23.0169 5.23786 18.664 9.63024L10.6009 17Z" stroke={isActive ? "#7209B7" : "#7A7A7A"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default Love