import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Slider from 'calcite-react/Slider'
import { FormHelperText } from 'calcite-react/Form'


export default function Home(props) {    
    //useHistory react stuff
    let history = useHistory();
    return (
        <Formik
            initialValues={{
              title: '',
              description: '',
              goal: 10000,
              daysActive: 1,
              isCharity: true,
              hasBeneficiary: true,
              visibleInSearch: true,
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
                if(!values.daysActive) {
                    errors.daysActive = 'You must insert # of days you plan on keeping you GoFundMe Project Online'
                }
                if(!values.isCharity) {
                    errors.isCharity = 'You must select whether your campaign is a charity or not'
                }
                if(!values.hasBeneficiary) {
                    errors.hasBeneficiary = 'You must select whether your campaign has a beneficiary or not'
                }
                if(!values.visibleInSearch) {
                    errors.visibleInSearch = 'You must select whether your campaign is public or private'
                }
                if(values.daysActive && (values.daysActive > 365 || values.daysActive < 1)) {
                    errors.daysActive = 'Number of days must be between 1 and 365'
                }
                if(!values.goal) {
                    errors.goal = 'You must set a goal for your campaign'
                }

                return errors
            }}
            onSubmit={async (values) => {
                let PostURL = 'http://localhost:8000/api/predict/' // this is for local testing. Just comment and uncomment these lines as needed.
                // let PostURL = '/api/predict/' // this is for production/deployment
                let apiResponse = await axios.post(PostURL, {
                    'title': values.title,
                    'description': values.description,
                    'daysActive': values.daysActive,
                    'goal': values.goal,
                    'isCharity': values.isCharity,
                    'visibleInSearch': values.visibleInSearch,
                    'hasBeneficiary': values.hasBeneficiary,
                })
                const azureResponse = JSON.parse(apiResponse.data)
                const scoredLabelsIndex = azureResponse.Results.output1.value.ColumnNames.indexOf('Scored Labels')
                if(scoredLabelsIndex === -1) {
                    history.push({
                        pathname: '/error',
                        state: { error: 'Scored Labels not found in the API response from Azure' }
                    })
                    return;
                }
                const predictedPercent = azureResponse.Results.output1.value.Values[0][scoredLabelsIndex]
                history.push({
                    pathname: '/prediction',
                    calculatedPercent: predictedPercent,
                });
                return;
            }}
        >{form => (
            <PaymentForm form={form} />
        )}</Formik>
    )
}

const PaymentForm = props => {
    // corona virus. COVID-19. Help me. Money. Service. Firefighters. Police men. Nurses. Doctors. Healthcare workers.
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

                        {/*Dropdown is charity*/}
                        <bs.Form.Label className="pt-2">Is your campaign a charity?</bs.Form.Label>
                        <Field name="isCharity" as="select" placeholder="Yes" className="form-control">
                          {options.map((option) =>
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                            )}
                        </Field>

                        {/*Dropdown has beneficiary*/}
                        <bs.Form.Label className="pt-2">Does your campaign have a beneficiary?</bs.Form.Label>
                        <Field name="hasBeneficiary" as="select" placeholder="Yes" className="form-control">
                          {options.map((option) =>
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                            )}
                        </Field>

                        {/*Dropdown visible in search*/}
                        <bs.Form.Label className="pt-2">Is your campaign public?</bs.Form.Label>
                        <Field name="visibleInSearch" as="select" placeholder="Yes" className="form-control">
                          {options.map((option) =>
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                            )}
                        </Field>

                        {/*Slider goal*/}
                        <bs.Form.Label className="pt-3">Target Funding Goal</bs.Form.Label>
                        <Field component={Slider} name="goal" min={100} max={100000} step={100} 
                          className="form-control" 
                          style={{  }}/>
                        <FormHelperText className="text-success">
                        ${props.form.values.goal} <br/>
                        </FormHelperText>

                        {/*Slider daysActive*/}
                        <bs.Form.Label className="pt-2">How long do you plan on accepting donations?</bs.Form.Label>
                        <Field component={Slider} name="daysActive" min={1} max={365} step={1} 
                          className="form-control" />
                        <FormHelperText className="text-success">
                          {props.form.values.daysActive} {props.form.values.daysActive > 1 ? 'days' : 'day'} <br/><br/>
                        </FormHelperText>

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
                        Predict Your Success</bs.Button>
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
 {"label": "Yes", "value": true},
 {"label": "No", "value": false}
]