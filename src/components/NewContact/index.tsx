import fecha from 'fecha';
import { Field, FieldProps, Formik, FormikActions, FormikProps, getIn } from 'formik';
import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import * as yup from 'yup';
import { IPhoneNumber } from '../../ducks/contacts';
import './index.css';

export interface INewContactFormValues {
  image?: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phone: IPhoneNumber;
  email: string;
}

const ContactSchema = yup.object().shape({
  birthday: yup.string().required('Required'),
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  phone: yup.object().shape({
    countryCode: yup.string().required(),
    number: yup.string().required('Required'),
  }),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Required'),
});

const emptyContact: INewContactFormValues = {
  birthday: fecha.format(new Date(), 'YYYY-MM-DD'),
  email: '',
  firstName: '',
  lastName: '',
  phone: {
    countryCode: '91',
    number: '',
  },
};

interface ISemanticFieldProps {
  label: string;
  type?: string;
  fluid?: boolean;
}

const SemanticField = (props: FieldProps & ISemanticFieldProps) => {
  const error =
    getIn(props.form.touched, props.field.name) && getIn(props.form.errors, props.field.name);

  return (
    <Form.Field error={Boolean(error)}>
      <label>{props.label}</label>
      <Input {...props.field} fluid={props.fluid} />
      {error && <span className='error'>{error}</span>}
    </Form.Field>
  );
};

const validateDate = (value: string) => {
  const regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  if (!regEx.test(value)) {
    return 'Must be a valid date in format: "YYYY-MM-DD"';
  }
};

const InnerForm: React.FC<FormikProps<INewContactFormValues>> = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <Field component={SemanticField} name='firstName' label='First Name' />
    <Field component={SemanticField} name='lastName' label='Last Name' />
    <Field component={SemanticField} name='email' label='Email' type='email' />
    <Field component={SemanticField} name='phone.number' label='Phone' />
    <Field component={SemanticField} name='birthday' label='Birthday' validate={validateDate} />

    <Button primary={true} type='submit'>
      Save
    </Button>
  </Form>
);

interface INewContactCbProps {
  onSave: (values: INewContactFormValues, actions: FormikActions<INewContactFormValues>) => void;
}

const NewContact: React.FC<INewContactCbProps> = ({ onSave }) => {
  return (
    <Formik
      initialValues={emptyContact}
      validationSchema={ContactSchema}
      onSubmit={onSave}
      component={InnerForm}
    />
  );
};

export default NewContact;
