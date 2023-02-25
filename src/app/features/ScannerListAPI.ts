const PL_API_URL = "https://wavescan-internship.saurabhmudgal.repl.co/success";

export type ScannerListProps = {
    scannerName: String,
    ipAddress: String,
    scannerSpeed: Number, //need to check if it is Float
    isAvailable: String
}

type getScannerListInput = {
    updateScannerList: (scannerList: ScannerListProps[])=> void
}

export async function getScannerList({updateScannerList}: getScannerListInput){
    return fetch(PL_API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => response.json())
    .then(data => {
        let d: ScannerListProps[] = data;
        updateScannerList(data);
    }).catch((error) => {
    })
};