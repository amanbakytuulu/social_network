import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarChatRow from './SidebarChatRow';

function SidebarChat() {
    const [show, setShow] = useState(true);
    const [value, setValue] = useState('blue');
    const [isSearch, setSearch] = useState(false);
    return (
        <>
            <SidebarChats show={show}>
                <ToggleButton show={show} onClick={() => setShow(!show)}>{show ? '→' : '←'}</ToggleButton>
                <StyledWrap>
                    <Title>Контакты</Title>
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#10d876" />
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#FE9431 " />
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#10d876" />
                    <Title>Группы</Title>
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#10d876" />
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#E50202" />
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#10d876" />
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#10d876" />
                    <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" status="#10d876" />
                    {/* <h4>Страницы</h4>
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" />
                <SidebarChatRow profile="https://templates.iqonic.design/socialv/bs5/react/build/static/media/01.7340bf5d.jpg" name="Anna Sthesia" text="Just Now" /> */}
                </StyledWrap>
            </SidebarChats>
        </>
    )
}

export default SidebarChat

const SidebarChats = styled.div`
    font-family: var(--body-font), sans-serif;
    z-index:99;
    position: fixed;
    top: 103px;
    right: ${props => props.show ? '0px' : '-240px'};
    background: var(--container-color);
    border-radius: 10px;
    padding: 15px 20px;
    max-width: 240px;
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    box-shadow: -3px 0px 15px rgba(99, 98, 98, 0.1);
    transition:all .3s linear;

    &:hover > button{
        opacity:1;
        transition:all 0.34s linear;
    }

`;

const ToggleButton = styled.button`
    position:absolute;
    font-size:23px;
    padding-bottom:5px;
    width:45px;
    height:50px;
    border-top-left-radius:50px;
    border-bottom-left-radius: 50px;
    outline:none;
    border:none;
    left:-45px;
    top:40px;
    color: white;
    background-color: var(--button-color);
    cursor:pointer;
    opacity:${props => props.show ? '0' : '1'};

`;

const StyledWrap = styled.div`
    overflow-x: visible;
    word-break: break-all;
    overflow-y: scroll;
    height: 100vh;
    width: 112%;
`;

const Title = styled.h4`
    margin-top: 15px;
    margin-bottom: 7px;
    font-size: 0.7rem;
    font-weight: 500;
    color: #adb5bd;
    text-transform: uppercase;
`;
