import React from 'react'
import {Container, Button} from 'react-bootstrap'

const header = {borderBottom: 'solid 2px lightgray', fontWeight: '900'}
const text = {color: '#5cb85c', textDecoration: 'underline'}
export default function LogIn(){
    return(
        <Container style={{textAlign: 'center'}}>
            <h1 className="pb-3 pt-3" style={header}>Sign In</h1>
            <Container className="pt-5 w-50">
                <Button variant="primary" className="p-2 px-5">Continue with Facebook</Button>
                <hr data-content="OR" class="m-5 hr-text"></hr>
                <Button variant="outline-success" className="p-2 px-5">Sign in with Go Fund Me</Button>
                <a href="/"><p className="m-5" style={text}>Why do I have to sign in?</p></a>
            </Container>
            <p className="p-0 m-0">Don't have an account? <a href="https://www.gofundme.com/sign-up"><span style={text}>Sign Up!</span></a></p>
        </Container>
    )
}

