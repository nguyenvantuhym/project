//import styled from 'styled-components';

import { Button, Header, Image, Modal } from 'semantic-ui-react';

// const StyledContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

const Home = () =>
  <div>

    <div>
    <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    </div>
    <div>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
    </div>

    </div>
;

export default Home;
