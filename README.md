
# Bloop

React component that can render JSX in a popup window

## Installation
```
npm install bloop-react
```

## Example Usage

```jsx
import Bloop from 'bloop-react'

...

render() {
    return (
        <Bloop 
            trigger={<button>i open the popup when clicked</button>}
            size='medium'
            position='center center'
            title='my popup title'
            onOpen={() => console.log('popup opened')}
            onClose={() => console.log('popup closed')}
        >
            <div>your popup content</div>
        </Bloop>
    )
}
```

## Available Props

```
name: trigger
type: JSX
description: The JSX element that will show the popup when clicked
```

```
name: size
type: String
description: The size of the popup
default: 'medium'
options: 'small', 'medium', 'large'
```

```
name: position
type: String
description: Initial position of the popup relative to the browser screen
default: 'center center'
options: 'top left', 'top center', 'top right', 'center left', 'center center', 'center right', 'bottom left', 'bottom center', 'bottom right'
```

```
name: title
type: String
description: The title that will appear on the popup toolbar
```

```
name: onOpen
type: Function
description: Called when the popup opens
```

```
name: onClose
type: Function
description: Called when the popup closes
```

## License
MIT
