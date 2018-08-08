import React, { Component } from 'react'
// components
import Nav from '../Nav'
// utils
import throttle from 'lodash.throttle'
import withSizes from 'react-sizes'
// styles
import styled from 'styled-components'
import { container, media } from '../styles'

const MIN_HEIGHT = 78

class TopMenu extends Component {

  constructor() {
    super()
    this.state = {
      scrolled: false
    }
    this.handleScrollThrottled = throttle(this.handleScroll, 300)
  }

  componentDidMount() {
    this.bodybag = document.getElementById('bodybag');
    this.isDocPage = window.location.pathname.split('/')[1] === 'doc'

    if (!this.props.isPhablet) {
      this.bodybag.addEventListener('scroll', this.handleScrollThrottled)
      this.handleScroll()
    }
  }

  componentWillUnmount() {
    if (!this.props.isPhablet) {
      this.bodybag.removeEventListener('scroll', this.handleScrollThrottled)
    }
  }

  handleScroll = (e) => {
    if (this.isDocPage) return;
    const scrollTop = e ? e.target.scrollTop : 0;
    this.setState({
      scrolled: scrollTop > 25
    })
  }

  render() {
    const { scrolled } = this.state

    return (
      <Wrapper>
        <Container scrolled={this.isDocPage || scrolled}>
          <Logo href="/">
            <img
              src="/static/img/logo.png"
              alt="dvc.org"
              width={36}
              height={23}
            />
          </Logo>
          <Nav mobile={false} />
        </Container>
      </Wrapper>
    )
  }
}

export default withSizes(
  ({ width }) => ({
    isPhablet: width <= 572,
  })  
)(TopMenu);

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  right: 0px;

  background-color: #ffffff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);
`

const Container = styled.section`
  ${container};
  width: auto;
  min-height: ${MIN_HEIGHT}px;

  ${props => `
    height: ${MIN_HEIGHT + (props.scrolled ? 0 : 20)}px;
  `}

  z-index: 3;
  position: relative;
  color: #ffffff;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  transition: height .2s linear;
  will-change: height;

  ${media.phablet`
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: auto;
  `};
`

const Logo = styled.a`
  display: block;
  padding-top: 10px;
  z-index: 999;

  ${media.phablet`
    padding-top: 10px;
    padding-bottom: 0px;
  `};
`
