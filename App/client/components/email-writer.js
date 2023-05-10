import { Button, Form, Input, Select } from 'antd';
import React from 'react'

export default function EmailWriter() {

    let [email, setEmail] = React.useState('')

    const onFinish = async (values) => {
        let res = await fetch('http://localhost:4000/generate-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                style: values.style,
                points: values.points,
            })
        });
        let data = await res.json();
        let email = data.data.choices[0].text;
        console.log(email)
        setEmail(email);
    }

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>

        <div style={{maxWidth: '700px'}}>
            <Form
                style={{width: '100%'}}
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item label="Select The style" name={'style'} rules={[{required: true}]}>
                    <Select placeholder="Style">
                        <Select.Option value="friendly">Friendly</Select.Option>
                        <Select.Option value="formal">Formal</Select.Option>
                        <Select.Option value="angry">Angry</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'points'} label='Enter the points for the email' rules={[{required: true}]}>
                    <Input.TextArea placeholder='Points'></Input.TextArea>
                </Form.Item>
                <Button htmlType='submit'>Generate</Button>
            </Form>

            <h3>Generated Email:</h3>
            <pre>{email}</pre>
        </div>

    </div>
  )
}
