import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Slider from 'calcite-react/Slider'
import { FormHelperText } from 'calcite-react/Form'


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
              title: '',
              goal: 10000,
              name: '',
              state: '',
              zipcode: '',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                if(!values.title) {
                    errors.title = 'You must insert a title for you GoFundMe Project'
                }
                if(!values.description) {
                    errors.description = 'You must insert a description for you GoFundMe Project'
                }
                if(!values.numdays) {
                    errors.numdays = 'You must insert # of days you plan on keeping you GoFundMe Project Online'
                }
                if(!values.state) {
                    errors.state = 'You must select a state where your GoFundMe Project is based'
                }
                if(!values.zipcode) {
                    errors.zipcode = 'without your zipcode, your package can\'t be delivered'
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
                })
                console.log("Django response: ", apiResponse.data)                
                history.push('/prediction');
            }}
        >{form => (
            <PaymentForm form={form} />
        )}</Formik>
    )
}

const PaymentForm = props => {
  return(
        <>
        {/*console.log("issubmitting 2", props.isSubmitting)*/}
    <bs.Container fluid className="p-0 flex-column">
        <Form>
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
                <bs.Col md={12} className="p-1 m-">
                        <p>Go Fund Me Campaign Details</p>
                        <Input title="Title" name="title" type="text" />
                        <Input title="Description" name="description" type="text" />
                        <Input title="Number of Days" name="numdays" type="text" />

                        {/*Dropdown*/}
                        <bs.Form.Label>State</bs.Form.Label>
                        <Field name="State" as="select" placeholder="Wyoming" className="form-control">
                          {options.map((option) =>
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                            )}
                        </Field>

                        {/*Slider*/}
                        <bs.Form.Label>Target Funding Goal</bs.Form.Label>
                        <Field component={Slider} name="goal" min={100} max={100000} step={100} 
                          className="form-control" 
                          style={{  }}/>
                        <FormHelperText>
                          ${props.form.values.goal}
                        </FormHelperText>

                        <Input title="Zip Code:" name="zipcode" type="text" />

                        {/*submit button*/}
                        <bs.Button 
                        variant='outline-success' 
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
                        Predict Your Future ;)</bs.Button>
                        {/* Another button here that links you to the GoFundMe site to create your fundraiser.*/}
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
);

const options = [
  {
      "label": "Alabama",
      "value": "AL"
  },
  {
      "label": "Alaska",
      "value": "AK"
  },
  {
      "label": "American Samoa",
      "value": "AS"
  },
  {
      "label": "Arizona",
      "value": "AZ"
  },
  {
      "label": "Arkansas",
      "value": "AR"
  },
  {
      "label": "California",
      "value": "CA"
  },
  {
      "label": "Colorado",
      "value": "CO"
  },
  {
      "label": "Connecticut",
      "value": "CT"
  },
  {
      "label": "Delaware",
      "value": "DE"
  },
  {
      "label": "District Of Columbia",
      "value": "DC"
  },
  {
      "label": "Federated States Of Micronesia",
      "value": "FM"
  },
  {
      "label": "Florida",
      "value": "FL"
  },
  {
      "label": "Georgia",
      "value": "GA"
  },
  {
      "label": "Guam Gu",
      "value": "GU"
  },
  {
      "label": "Hawaii",
      "value": "HI"
  },
  {
      "label": "Idaho",
      "value": "ID"
  },
  {
      "label": "Illinois",
      "value": "IL"
  },
  {
      "label": "Indiana",
      "value": "IN"
  },
  {
      "label": "Iowa",
      "value": "IA"
  },
  {
      "label": "Kansas",
      "value": "KS"
  },
  {
      "label": "Kentucky",
      "value": "KY"
  },
  {
      "label": "Louisiana",
      "value": "LA"
  },
  {
      "label": "Maine",
      "value": "ME"
  },
  {
      "label": "Marshall Islands",
      "value": "MH"
  },
  {
      "label": "Maryland",
      "value": "MD"
  },
  {
      "label": "Massachusetts",
      "value": "MA"
  },
  {
      "label": "Michigan",
      "value": "MI"
  },
  {
      "label": "Minnesota",
      "value": "MN"
  },
  {
      "label": "Mississippi",
      "value": "MS"
  },
  {
      "label": "Missouri",
      "value": "MO"
  },
  {
      "label": "Montana",
      "value": "MT"
  },
  {
      "label": "Nebraska",
      "value": "NE"
  },
  {
      "label": "Nevada",
      "value": "NV"
  },
  {
      "label": "New Hampshire",
      "value": "NH"
  },
  {
      "label": "New Jersey",
      "value": "NJ"
  },
  {
      "label": "New Mexico",
      "value": "NM"
  },
  {
      "label": "New York",
      "value": "NY"
  },
  {
      "label": "North Carolina",
      "value": "NC"
  },
  {
      "label": "North Dakota",
      "value": "ND"
  },
  {
      "label": "Northern Mariana Islands",
      "value": "MP"
  },
  {
      "label": "Ohio",
      "value": "OH"
  },
  {
      "label": "Oklahoma",
      "value": "OK"
  },
  {
      "label": "Oregon",
      "value": "OR"
  },
  {
      "label": "Palau",
      "value": "PW"
  },
  {
      "label": "Pennsylvania",
      "value": "PA"
  },
  {
      "label": "Puerto Rico",
      "value": "PR"
  },
  {
      "label": "Rhode Island",
      "value": "RI"
  },
  {
      "label": "South Carolina",
      "value": "SC"
  },
  {
      "label": "South Dakota",
      "value": "SD"
  },
  {
      "label": "Tennessee",
      "value": "TN"
  },
  {
      "label": "Texas",
      "value": "TX"
  },
  {
      "label": "Utah",
      "value": "UT"
  },
  {
      "label": "Vermont",
      "value": "VT"
  },
  {
      "label": "Virgin Islands",
      "value": "VI"
  },
  {
      "label": "Virginia",
      "value": "VA"
  },
  {
      "label": "Washington",
      "value": "WA"
  },
  {
      "label": "West Virginia",
      "value": "WV"
  },
  {
      "label": "Wisconsin",
      "value": "WI"
  },
  {
      "label": "Wyoming",
      "value": "WY"
  }
]