import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const propTypes = {
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large'
    ]),
    position: PropTypes.oneOf([
        'top left',
        'top center',
        'top right',
        'left center',
        'center center',
        'right center',
        'bottom left',
        'bottom center',
        'bottom right'
    ]),
    title: PropTypes.string,
    multiple: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
}

const defaultProps = {
    size: 'medium',
    position: 'center center',
    multiple: false,
    title: '',
    onOpen: () => {},
    onClose: () => {}
}

class Bloop extends Component {
    constructor(props) {
        super(props)
        this.externalWindow = null
        this.containerDiv = document.createElement('div')
        this.popups = []
        this.showPopup = this.showPopup.bind(this)
    }

    getPopupSize() {
        const dimensions = { width: 0, height: 0 }
        switch (this.props.size) {
            case 'small':
                dimensions.width = 300
                dimensions.height = 300
                break;
            case 'medium':
                dimensions.width = 500
                dimensions.height = 500
                break;
            case 'large':
                dimensions.width = 700
                dimensions.height = 700
                break;
            default:
                dimensions.width = 500
                dimensions.height = 500
                break;
        }
        return dimensions
    }

    getPosition(popupDimensions) {
        const { width, height } = popupDimensions
        const coordinates = { x: 0, y: 0 }
        switch (this.props.position) {
            case 'top left':
                coordinates.x = 0
                coordinates.y = 0
                break;
            case 'top center':
                coordinates.x = window.screen.width/2 - width/2
                coordinates.y = 0
                break;
            case 'top right':
                coordinates.x = window.screen.width - width
                coordinates.y = 0
                break;
            case 'center left':
                coordinates.x = 0
                coordinates.y = window.screen.height/2 - height/2
                break;
            case 'center center':
                coordinates.x = window.screen.width/2 - width/2
                coordinates.y = window.screen.height/2 - height/2
                break;
            case 'center right':
                coordinates.x = window.screen.width - width
                coordinates.y = window.screen.height/2 - height/2
                break;
            case 'bottom left':
                coordinates.x = 0
                coordinates.y = window.screen.height - height
                break;
            case 'bottom center':
                coordinates.x = window.screen.width/2 - width/2
                coordinates.y = window.screen.height - height
                break;
            case 'bottom right':
                coordinates.x = window.screen.width - width
                coordinates.y = window.screen.height - height
                break;
            default:
                coordinates.x = window.screen.width/2 - width/2
                coordinates.y = window.screen.height/2 - height/2
                break;
        }
        return coordinates
    }

    createPopup() {
        const popupName = this.props.multiple ? `bloop-${this.popups.length + 1}` : 'bloop'
        const { width, height } = this.getPopupSize()
        const { x, y } = this.getPosition({width, height})

        this.externalWindow = window.open('', popupName, `width=${width},height=${height},left=${x},top=${y}`)
        this.externalWindow.document.title = this.props.title || ''
        this.popups.push(this.externalWindow)
        this.props.onOpen ? this.props.onOpen() : this.defaultProps.onOpen()

        if (this.externalWindow.document) {
            this.externalWindow.document.body.appendChild(this.containerDiv)
        }
    }

    showPopup() {
        this.createPopup()

        this.externalWindow.addEventListener('beforeunload', () => {
            this.props.onClose ? this.props.onClose() : this.defaultProps.onClose()
            this.createPopup()
        })
    }

    render() {
        return (
            <div className="Bloop" style={{ display: 'inline-block' }}>
                <div onClick={this.showPopup}>
                    {this.props.trigger}
                </div>
                {
                    ReactDOM.createPortal(
                        <div>
                            {this.props.children}
                        </div>,
                        this.containerDiv
                    )
                }
            </div>
        )
    }
}

Bloop.propTypes = propTypes
Bloop.defaultProps = defaultProps

export default Bloop