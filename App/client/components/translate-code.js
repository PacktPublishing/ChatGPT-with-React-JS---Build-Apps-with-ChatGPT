import { Button, Form, Input, Select } from 'antd'
import React from 'react'

export default function TranslateCode() {

    let [convertedCode, setConvertedCode] = React.useState('')

    const onFinish = async (values) => {
        let res = await fetch('http://localhost:4000/convert-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: values.from,
                to: values.to,
                code: values.code
            })
        });
        let data = await res.json();
        let convertedCode = data.data.choices[0].text;
        setConvertedCode(convertedCode);
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
                            <Select.Option value="javascript">JavaScript</Select.Option>
                            <Select.Option value="java">Java</Select.Option>
                            <Select.Option value="python">Python</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Select To Language" name={'to'} rules={[{required: true}]}>
                        <Select placeholder="To Language">
                            <Select.Option value="javascript">JavaScript</Select.Option>
                            <Select.Option value="java">Java</Select.Option>
                            <Select.Option value="python">Python</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'code'} label='Enter The code' rules={[{required: true}]}>
                        <Input.TextArea placeholder='Enter the code'></Input.TextArea>
                    </Form.Item>
                    <Button htmlType='submit'>Convert</Button>
                </Form>

                <h3>Converted Code:</h3>
                <pre style={{whiteSpace: 'break-spaces'}}>{convertedCode}</pre>
            </div>

        </div>
    )
}
