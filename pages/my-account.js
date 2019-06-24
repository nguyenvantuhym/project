import { useState } from 'react';
import NavBasicExample from '../components/nav';

export default () => {
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);
    return (
        <Fabric>
			<NavBasicExample />
            <p>My Account</p>

        </Fabric>
    );
};
