import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import img from './temp_img.jpg';
import MoreInfoModal from '../MoreInfoModal/index'

const PostWrapper = styled.div`
  opacity: 1;
  height: 300px;
  width: 33.33%;
  overflow: hidden;
  position: relative;
  background: url(${img}); 
  
  img {
    position: absolute;
    top: 0;
    z-index: 0;
  }
`;

const OverlayInfo = styled.div`
  z-index: 3;
  color: white;
  height: 300px;
  padding: 30px;
  position: relative;
  text-align: center;
  background: rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ButtonBar = styled.div`
  
`;

const Button = styled.button`
  background: none;
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 15px;
  border: 1px solid white;
`;

class Post extends React.PureComponent {
  state = {
    showOverlay: false,
    showModal: false
  }

  handleShow = () => {
    this.setState({
      showOverlay: true
    })
  }

  handleHide = () => {
    this.setState({
      showOverlay: false
    })
  }

  handleToggleModal = () => {
    console.log('called')
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    const { showOverlay, showModal } = this.state
    return (
      <PostWrapper onMouseOver={this.handleShow} onMouseLeave={this.handleHide}>
        <Fade when={showOverlay}>
          <OverlayInfo>
            <h2>Social Media App</h2>
            <p>
              description of your project, any bulllshit that nobody will read
              description of your project, any
            </p>
            <ButtonBar>
              <Button onClick={this.handleToggleModal}>
                + Info
              </Button>
              <Button>
                Demo
              </Button>
            </ButtonBar>
          </OverlayInfo>
        </Fade>
        {showModal && (
          <MoreInfoModal onClose={this.handleToggleModal}/>
        )}
        {/*<img src={require('./temp_img.jpg')} alt="test"/>*/}
      </PostWrapper>
    )
  }
}

export default Post