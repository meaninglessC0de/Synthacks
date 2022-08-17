import { Component } from 'react'
import {React} from 'react'
import {Container,Button,Card} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import './EmailMaker.css'
import Mail from '../../mail.svg'


const {Configuration, OpenAIApi}=require('openai')
class ProductDescription extends Component {
    constructor(){
        super()
        this.state = {
            heading: 'The Response from the AI will be shown here',
            response: '.....waiting for input'
        }
    }

    onFormSubmit=e=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const formDataObj=Object.fromEntries(formData.entries())
        console.log(formDataObj.productName)

        // const { Configuration, OpenAIApi } = require("openai");

        // const configuration = new Configuration({
        //   apiKey: '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',
        // });
        // const openai = new OpenAIApi(configuration);
        
        // "Write me a long  description for an amazing phone \n",
        
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String('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')
            },
            body: JSON.stringify({
              'prompt': `Write me an an email on the topic: ${formDataObj.productName}. The email has to be ${formDataObj.ProductDescription}`,
              'temperature': 0.1,
              'max_tokens': 100,
              'top_p': 1,
              'frequency_penalty': 0,
              'presence_penalty': 0.5,
              'stop': ["\"\"\""],
            })
          };
          fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestOptions)
              .then(response => response.json())
              .then(data => {
                this.setState({
                    response: `${data.choices[0].text}`
                })
            }).catch(err => {
              console.log("Ran out of tokens for today! Try tomorrow!");
            });
        }
    
    
    render(){
        return(
            <div>
               <Form onSubmit={this.onFormSubmit} className="container">
                    <Form.Group className='mb-3' controlID='formBasicEmail'>
                        <Form.Label>What Email would you like to generate:</Form.Label>
                        <br></br>
                        <Form.Control
                        type='text'
                        name='productName'
                        placeholder='Enter Topic'
                        className='login-form'></Form.Control>
                        <br></br>
                        <br></br>
                        <Form.Label>Enter a few adjectives about the email:</Form.Label>
                        <br></br>
                        <Form.Control
                        type='text'
                        className='login-form'
                        name='productDescription'
                        placeholder='Enter adjectives'></Form.Control>

                        <br></br>
                        <br></br>
                        {/* <Form.Text className='text-muted'> Enter info here: </Form.Text> */}
                    </Form.Group>

                    <Button variant='primary' size='sm' type='submit'>
                        <img src={Mail} width='100px' height='100px'></img>
                        <p>Generate</p>
                    </Button>
                    <br></br>
                    <br></br>

               </Form>
            <div className='thing'>
            
                 {this.state.heading}
            
                <br></br><br></br>
                {this.state.response}
            

            </div>
    
            
               
    
            </div>
        )
    }
}

export default ProductDescription;