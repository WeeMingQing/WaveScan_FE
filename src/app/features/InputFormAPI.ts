const IF_API_URL = "https://wavescan-internship.saurabhmudgal.repl.co/submitForm";

export type InputFormProps = {
    projectName: String,
    scanningMode: String,
    scanDimensionsX: Number, //need to check if it is Integer
    scanDimensionsY: Number, //need to check if it is Integer
    scannerFrequency: Number //need to check if it is Float
}

export async function postInputForm(formData: InputFormProps) {
    fetch(`${IF_API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            formData
        )
    }).then((response) => {
        if (response.status == 200) {
            console.log("Yeah, successful");
        } else if (response.status == 400){
            console.log("Please try again!");
        }
    })
};