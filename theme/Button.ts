import { ComponentStyleConfig } from "@chakra-ui/react"

const Button : ComponentStyleConfig = {
    variants: {
        'sidebar': {
            bgColor: 'transparent',
            width: '98%',
            borderRadius: '6px',
            color: 'primaryText',
            fontWeight: '400',
            fontSize: '16px',
            justifyContent: 'flex-start',
            gap: '10px',
            fill: 'primaryText',
            transition: 'all 200ms',
            _active: {
                bgImage: 'linear-gradient(to right, #B5179E , #7209B7)',
                color: '#fff',
                fill: 'white'
            }
        }
    }
}

export default Button;