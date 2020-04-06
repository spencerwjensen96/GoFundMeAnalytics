import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router-dom';


export default function Home(props) {

    //these are to get the current month/year for the expiration date tests in payment_intent
    let today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    
    //useHistory react stuff
    let history = useHistory();

    today = mm + '/' + yyyy;

    return (
        <Formik
            initialValues={{
                name: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipcode: '',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                if(!values.name) {
                    errors.name = 'without your name, your package can\' be delivered'
                }
                if(!values.address1) {
                    errors.address1 = 'without your address, your package can\'t be delivered'
                }
                if(!values.city) {
                    errors.city = 'without your city, your package can\'t be delivered'
                }
                if(!values.state) {
                    errors.state = 'without your state, your package can\'t be delivered'
                }
                if(!values.zipcode) {
                    errors.zipcode = 'without your zipcode, your package can\'t be delivered'
                }
                //check if they changed values from the initial placeholder values
                if(values.address2 === 'Watch out for my hammer ;)') {
                    errors.address2 = 'when lightning strikes, be very careful...'
                }
                if(values.city === 'Asgard') {
                    errors.city = 'Shipping to Asgard costs 2 tesarects, and payment is required in advance'
                }
                if(values.state === 'The Sky') {
                    errors.state = 'Alternate shipping methods are needed. Please place your order by phone by calling: 224444'
                }
                if(values.zipcode && (values.zipcode.length > 10 || values.zipcode.length < 5)) {
                    errors.zipcode = 'zipcode must be between 5 and 10 characters'
                }
                //making sure the zipcode contains only #'s and/or dashes
                if(values.zipcode) {
                    const numberArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
                    for(let i = 0; i < values.zipcode.length; i++) {
                        if(values.zipcode[i] !== '-' && !(values.zipcode[i] in numberArr)) {
                            errors.zipcode = 'zipcodes can only contain numbers and dashes "-"'
                        }
                    }
                }
                return errors
            }}
            onSubmit={async (values) => {
                let PostURL = 'http://localhost:8000/api/predictfunding/'
                let apiResponse = await axios.post(PostURL, {
                    //values go here
                    "name": values.name,
                    "address1": values.address1,
                    "address2": values.address2,
                    "city": values.city,
                    "state": values.state,
                    "zipcode": values.zipcode,
                    "total": 0,
                    "items": {},
                    "payment_intent": {}
                })
                console.log("Django response: ", apiResponse.data)                
                history.push('/prediction');
            }}
        >{form => (
            <PaymentForm form={form} />
        )}</Formik>
    )
}


const options = [
  {
    "value": "WI", "label": "Wisconsin"
  },
  {
    "value": "WY", "label": "Wyoming"
  }
]

/**
 * The form layout/html.
 * This component needs finishing.
 */


const PaymentForm = props => {
  return(
        <>
        {/*console.log("issubmitting 2", props.isSubmitting)*/}
    <bs.Container fluid className="p-0 flex-column">
        <Form>
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
                <bs.Col md={6} className="p-1">
                        <p>Shipping and Billing Address</p>
                        <Input title="Name:" name="name" type="text" />
                        <Input title="Address Line 1:" name="address1" type="text" />
                        <Input title="(Optional) Address Line 2:" name="address2" type="text" />
                        <Input title="City:" name="city" type="text" />
                        <bs.Form.Label>State</bs.Form.Label>
                        <Field name="State" as="select" placeholder="Wyoming" className="form-control">
                          {options.map((option) =>
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                            )}
                        </Field>
                        <bs.Form.Label>Slider</bs.Form.Label>
                        <Field name="slider" as="range" placeholder="100" value="100" min="99" max="100000">
                        </Field>
                        <Input title="Zip Code:" name="zipcode" type="text" />
                </bs.Col>
                <bs.Col md={6} className="p-1">
                    <p hidden={props.hideError} className='text-danger'></p>
                    <p>Your Card will be charged:</p>
                    <bs.Button 
                        variant='warning' 
                        disabled={props.form.isSubmitting}
                        onClick={() => {
                            props.form.submitForm(); 
                        }}>
                            <bs.Spinner 
                                animation="border" 
                                role="status"
                                as="span"
                                size="sm"
                                aria-hidden={true}
                                hidden={!props.form.isSubmitting} /> 
                        Place Your Order</bs.Button>
                </bs.Col>
        </bs.Row>
        </Form>
    </bs.Container>
    </>
    );
}

/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 *   This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                disabled={rProps.form.isSubmitting}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)

