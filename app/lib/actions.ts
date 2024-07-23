import OpenAI from "openai";

const openai = new OpenAI();

export async function extractData(url: string) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text", text: "Extraia as informações desse cupom fiscal (em inglês, receipt)." +
                            "Retorna apenas JSON, nem nenhum texto adicional." +
                            "" +
                            "Retone o JSON com as seguintes chaves:" +
                            "- 'valor': total do cupom, usando ',' para separar as casas decimais. Remova os separadores de milhares e o símbolo R$ ou $." +
                            "- 'estabelecimento': nome do fornecedor" +
                            "- 'descricao': um resumo do que foi comprado" +
                            "- 'categoria': uma categoria que resuma a compra" +
                            "- 'data': data da compra" +
                            "- 'tipo': se isso é um cupom fiscal, um boleto, ou uma nota fiscal" +
                            "" +
                            "Se não conseguir extrair alguma informação, retorne uma string vazia naquela para a chave."
                    },
                    {
                        type: "image_url",
                        image_url: {
                            "url": url,
                        },
                    },
                ],
            },
        ],
    });
    console.log(response.choices[0].message.content);
    // return response.choices[0];
}

// export async function createDocument(prevState: State, formData: FormData) {
//     // const validatedFields = CreateInvoice.safeParse({
//     //     amount: formData.get('amount'),
//     //     status: formData.get('status'),
//     // });
//     // if (!validatedFields.success) {
//     //     return {
//     //         errors: validatedFields.error.flatten().fieldErrors,
//     //         message: 'Missing Fields. Failed to Create Invoice.',
//     //     };
//     // }
//     const { customerId, amount, status } = validatedFields.data;
//     const amountInCents = amount * 100;
//     const date = new Date().toISOString().split('T')[0];
//
//     await sql`
//             INSERT INTO invoices (customer_id, amount, status, date)
//             VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//         `;
//
//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
//
// }