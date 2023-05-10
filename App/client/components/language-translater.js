import { Button, Form, Input, Select } from 'antd';
import React from 'react'

export default function LanguageTranslater() {

    let [convertedText, setConvertedText] = React.useState('')

    const onFinish = async (values) => {
        let res = await fetch('http://localhost:4000/convert-language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: values.from,
                to: values.to,
                text: values.text
            })
        });
        let data = await res.json();
        let convertedText = data.data.choices[0].text;
        setConvertedText(convertedText);
    }

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>

            <div style={{maxWidth: '700px'}}>
                <Form
                    style={{width: '100%'}}
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Form.Item label="Select From Language" name={'from'} rules={[{required: true}]}>
                        <Select placeholder="From Language">
                            <Select.Option value="english">English</Select.Option>
                            <Select.Option value="hindi">Hindi</Select.Option>
                            <Select.Option value="spanish">Spanish</Select.Option>
                            <Select.Option value="french">French</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Select To Language" name={'to'} rules={[{required: true}]}>
                        <Select placeholder="To Language">
                            <Select.Option value="english">English</Select.Option>
                            <Select.Option value="hindi">Hindi</Select.Option>
                            <Select.Option value="spanish">Spanish</Select.Option>
                            <Select.Option value="french">French</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'text'} label='Enter the text' rules={[{required: true}]}>
                        <Input.TextArea placeholder='Enter the text'></Input.TextArea>
                    </Form.Item>
                    <Button htmlType='submit'>Convert</Button>
                </Form>

                <h3>Converted Language:</h3>
                <pre style={{whiteSpace: 'break-spaces'}}>{convertedText}</pre>
            </div>

        </div>
  )
}
