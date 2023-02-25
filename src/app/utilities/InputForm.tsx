import React, {useState, useRef, useEffect} from 'react'
import './InputForm.css'
import DropdownBtn from '../components/DropdownBtn';
import { postInputForm } from '../features/InputFormAPI';
import { InputFormProps } from '../features/InputFormAPI';
import { ClipLoader } from 'react-spinners';
import { ScannerListProps } from '../features/ScannerListAPI';
import { getScannerList } from '../features/ScannerListAPI';
// type InputFormProps = {
//     projectName: String,
//     scanningMode: String,
//     scanDimensionsX: number, //need to check if it is Integer
//     scanDimensionsY: number, //need to check if it is Integer
//     scannerFrequency: number //need to check if it is Float
// }

function InputForm() {
    useEffect(() => {
        setLoading(false);
        setSubmitted(false);
    }, []);

    //These are used to store the users' inputs for each category
    const [projectNameState, setProjectNameState] = useState<String>("");
    const [scanningModeState, setScanningModeState] = useState<String>("");
    const [scanDimensionsXState, setScanDimensionsXState] = useState<String>("");
    const [scanDimensionsYState, setScanDimensionsYState] = useState<String>("");
    const [scannerFrequencyState, setScannerFrequencyState] = useState<String>("");
    const [projectNameErrorMsg, setProjectNameErrorMsg] = useState<String>("");
    const [scanningModeErrorMsg, setScanningModeErrorMsg] = useState<String>("");
    const [scanDimensionsXErrorMsg, setScanDimensionsXErrorMsg] = useState<String>("");
    const [scanDimensionsYErrorMsg, setScanDimensionsYErrorMsg] = useState<String>("");
    const [scannerFrequencyErrorMsg, setScannerFrequencyErrorMsg] = useState<String>("");
    const [projectNameErr, setProjectNameErr] = useState<String>("");
    const [scanningModeErr, setScanningModeErr] = useState<String>("");
    const [scanDimensionsXErr, setScanDimensionsXErr] = useState<String>("");
    const [scanDimensionsYErr, setScanDimensionsYErr] = useState<String>("");
    const [scannerFrequencyErr, setScannerFrequencyErr] = useState<String>("");
    const projectName = useRef<String>("");
    const scanningMode = useRef<String>("");
    const scanDimensionsX = useRef<String>("");
    const scanDimensionsY = useRef<String>("");
    const scannerFrequency = useRef<String>("");
    let scanningModeNames: String[] = ["GANTRY", "CRAWLER","AUTO","MANUAL","ARM"];
    let errorMessage: String[] = ["Name too short!", "Select one mode!", 
    "Must be integer!", "Must be >= 1!", "To 1 d.p.!", "Must be positive value!"];
    const [errorArray, setErrorArray] = useState<String[]>([]);
    let namesArray: String[] = ["Project Name", "Scanning Mode", "Scan DimensionsX", "Scan DimensionsY", "Scanner Frequency"];
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [switchToScannerList, setSwitchToScannerList] = useState<boolean>(false);
    const [scannerList, setScannerList] = useState<ScannerListProps[]>([]);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [switchToScannerList]);

    function updateResponseError() {
        setResponseError(prevResponseError => !prevResponseError);
    }

    function updateScannerList(scannerList: ScannerListProps[]) {
        setScannerList(scannerList);
    }

    function addToErrorArray(name: String) {
        if (!(errorArray.includes(name))) {
            errorArray.push(name);
            setErrorArray(errorArray);
        }
    }

    function removeFromErrorArray(name: String) {
        if (errorArray.includes(name)) {
            const index = errorArray.indexOf(name);
            errorArray.splice(index, 1);
            setErrorArray(errorArray);
        }
    }

    function handleProjectName(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement;
        projectName.current = target.value.trim();
        setProjectNameState(projectName.current);
    }

    function checkProjectName() {
        if (projectName.current.length < 3) {
            setProjectNameErrorMsg(errorMessage[0]);
            setProjectNameErr(" error");
            addToErrorArray(namesArray[0]);
        } else {
            setProjectNameErrorMsg("");
            setProjectNameErr("");
            removeFromErrorArray(namesArray[0]);
        }
    }

    function handleScanningMode(mode: String) {
        scanningMode.current = mode;
        setScanningModeState(mode);
    }

    function checkScanningMode() {
        if (scanningMode.current == "") {
            setScanningModeErrorMsg(errorMessage[1]);
            addToErrorArray(namesArray[1]);
        } else {
            setScanningModeErrorMsg("");
            removeFromErrorArray(namesArray[1]);
        }
    }

    function handleDimensionsX(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement;
        scanDimensionsX.current = target.value.trim();
        setScanDimensionsXState(scanDimensionsX.current);

    }

    function checkDimensionsX() {
        let b: String = scanDimensionsX.current;
        let a: Number = Number(scanDimensionsX.current)
        if (Number.isNaN(a) || !(Number.isInteger(a)) || b.includes(".")) {
            setScanDimensionsXErrorMsg(errorMessage[2]);
            setScanDimensionsXErr(" error");
            addToErrorArray(namesArray[2]);
        } else if (a <= 0) {
            setScanDimensionsXErrorMsg(errorMessage[3]);
            setScanDimensionsXErr(" error");
            addToErrorArray(namesArray[2]);
        } else {
            setScanDimensionsXErrorMsg("");
            setScanDimensionsXErr("");
            removeFromErrorArray(namesArray[2]);
        }
    }

    function handleDimensionsY(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement;
        scanDimensionsY.current = target.value.trim();
        setScanDimensionsYState(scanDimensionsY.current);

    }

    function checkDimensionsY() {
        let b: String = scanDimensionsY.current;
        let a: Number = Number(scanDimensionsY.current)
        if (Number.isNaN(a) || !(Number.isInteger(a)) || b.includes(".")) {
            setScanDimensionsYErrorMsg(errorMessage[2]);
            setScanDimensionsYErr(" error");
            addToErrorArray(namesArray[3]);
        } else if (a <= 0) {
            setScanDimensionsYErrorMsg(errorMessage[3]);
            setScanDimensionsYErr(" error");
            addToErrorArray(namesArray[3]);
        }
        else {
            setScanDimensionsYErrorMsg("");
            setScanDimensionsYErr("");
            removeFromErrorArray(namesArray[3]);
        }
    }

    function handleScannerFrequency(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement;
        scannerFrequency.current = target.value.trim();
        setScannerFrequencyState(scannerFrequency.current);
    }

    function checkScannerFrequency() {
        let b:String = scannerFrequency.current;
        let a: Number = Number(scannerFrequency.current)
        if (Number.isNaN(a)) {
            setScannerFrequencyErrorMsg(errorMessage[5]);
            setScannerFrequencyErr(" error");
            addToErrorArray(namesArray[4]);
        } else if (a <= 0) {
            setScannerFrequencyErrorMsg(errorMessage[3]);
            setScannerFrequencyErr(" error");
            addToErrorArray(namesArray[4]);
        } else if (!b.includes(".") || b.split('.')[1].length != 1) {
            setScannerFrequencyErrorMsg(errorMessage[4]);
            setScannerFrequencyErr(" error");
            addToErrorArray(namesArray[4]);
        } else {
            setScannerFrequencyErrorMsg("");
            setScannerFrequencyErr("");
            removeFromErrorArray(namesArray[4]);
        }
    }

    function submitForm(event: any) {
        setBtnDisabled(true);
        event.preventDefault();
        checkProjectName();
        checkScanningMode();
        checkDimensionsX();
        checkDimensionsY();
        checkScannerFrequency();
        if (errorArray.length == 0) {
            //If all inputs are valid, proceed with form submission
            let formData: InputFormProps = {
                "projectName": projectName.current,
                "scanningMode": scanningMode.current, 
                "scanDimensionsX": Number(scanDimensionsX.current),
                "scanDimensionsY": Number(scanDimensionsY.current),
                "scannerFrequency": Number(scannerFrequency.current)
            };
            postInputForm({formData, updateResponseError}).then(() => {
                if (responseError) {
                    setLoading(false);
                    setSubmitted(false);
                    setOpenModal(true);
                    setBtnDisabled(false);
                } else {
                    getScannerList({updateScannerList}).then(() => {
                        setOpenModal(true);
                        setLoading(true);
                        setSubmitted(true);
                        setTimeout(()=>{
                            setOpenModal(false);
                            setLoading(false);
                            setSwitchToScannerList(true);
                        }, 5000);
                    })
                }
            });
        } else {
            setLoading(false);
            setSubmitted(false);
            setOpenModal(true);
            setBtnDisabled(false);
        }        
    };

    return (
        <div className='inputForm_main_container'>
            {openModal && (
                <div className='modal_container'>
                    <div className='modal_card'>
                        <h2 className='modal_header'>{(submitted) ? "Form Submitted" : "Error Message"}</h2>
                        {(responseError) ?
                        <>
                        <h4 className='modal_content'>Please try again in a while</h4>
                        </>
                        :
                        <>
                        <h4 className='modal_content'>{(submitted) ? "Your form has been successfully submitted. Please wait while we search for the scanners.": 
                        `Please check the following input fields:`}</h4>
                        <div className='errorMsgList'>
                        {errorArray && errorArray.length != 0 && errorArray.map((value, index)=> {
                            return (<h6 className='errorMsg_h6'>-{value}</h6>)
                        })
                        }
                        </div>
                        </>
                        }
                        <div className='modal_loading_component'>
                            {(submitted) ?
                                <ClipLoader color={"blue"} loading={loading as boolean} size={30}/>
                            :
                                <button className='modal_button'
                                onClick={()=> setOpenModal(false)}>Close</button>
                            }
                        </div>
                    </div>
                </div>
            )}
            <div className='form_main_container'>
                {((switchToScannerList)) ?
                <>
                <h2 className='form_main_container_header'>Scanner List</h2>
                <span className='form_main_container_header_underline'></span>
                <div className='scanner_number_component'>
                    <h4 className='scanner_number_component_h4'>Scanners found: {scannerList.length}</h4>
                </div>
                    <div className='scanner_main_container'>
                    <div className='scanner_header_component_first'>
                        <h4 className='scanner_component_list_h4'>Scanner Name</h4>
                        {scannerList.map((value, index)=> {
                        return(
                            <React.Fragment key={index}>
                                <div className='scanner_component_list_first'>
                                    <h4>{value.scannerName}</h4>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    </div>
                    <div className='scanner_header_component'>
                        <h4 className='scanner_component_list_h4'>IP Address</h4>
                        {scannerList.map((value, index)=> {
                        return(
                            <React.Fragment key={index}>
                                <div className='scanner_component_list'>
                                    <h4>{value.ipAddress}</h4>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    </div>
                    <div className='scanner_header_component'>
                        <h4 className='scanner_component_list_h4'>Scanner Speed</h4>
                        {scannerList.map((value, index)=> {
                        return(
                            <React.Fragment key={index}>
                                <div className='scanner_component_list'>
                                    <h4>{value.scannerSpeed.toString()} m/s</h4>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    </div>
                    <div className='scanner_header_component'>
                        <h4 className='scanner_component_list_h4'>Status</h4>
                        {scannerList.map((value, index)=> {
                        return(
                            <React.Fragment key={index}>
                                <div className='scanner_component_list'>
                                    <h4>{(JSON.parse(value.isAvailable as string)) ? "Available" : "Engaged"}</h4>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    </div>
                    <div className='scanner_header_component'>
                        <h4 className='scanner_component_list_h4'>Join</h4>
                        {scannerList.map((value, index)=> {
                        if (JSON.parse(value.isAvailable as string)) {
                        return(
                            <React.Fragment key={index}>
                                <div className='scanner_component_list_button'>
                                    <button className='scanner_component_list_button_button_clickable'
                                    disabled={(JSON.parse(value.isAvailable as string)) ? false : true}>
                                        Connect
                                    </button>
                                </div>
                            </React.Fragment>
                        )
                        } else {
                            return(
                                <React.Fragment key={index}>
                                    <div className='scanner_component_list_button'>
                                        <button className='scanner_component_list_button_button_unclickable'
                                        disabled={(JSON.parse(value.isAvailable as string)) ? false : true}>
                                            Connect
                                        </button>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    })}
                    </div>
                </div>
                <div className='scanner_smaller_main_container'>
                    {scannerList && scannerList.length != 0 && scannerList.map((value, index)=> {
                        if (JSON.parse(value.isAvailable as string)) {
                            return (
                                <React.Fragment key={index}>
                                    <div>
                                        <div className='scanner_smaller_component_top'>
                                            <h2 className="scanner_smaller_component_top_h2">{value.scannerName}</h2>
                                            <button className='scanner_smaller_component_list_button_button_clickable'>Connect</button>
                                        </div>
                                        <h5 className='scanner_smaller_component_h5'>IP Address: {value.ipAddress}</h5>
                                        <h5 className='scanner_smaller_component_h5'>Scanner Speed: {value.scannerSpeed.toString()} m/s</h5>
                                        <h5 className='scanner_smaller_component_h5'>Status: {(JSON.parse(value.isAvailable as string)) ? "Available" : "Engaged"}</h5>
                                    </div>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment key={index}>
                                    <div>
                                        <div className='scanner_smaller_component_top'>
                                            <h2 className="scanner_smaller_component_top_h2">{value.scannerName}</h2>
                                            <button className='scanner_smaller_component_list_button_button_unclickable'>Connect</button>
                                        </div>
                                        <h5 className='scanner_smaller_component_h5'>IP Address: {value.ipAddress}</h5>
                                        <h5 className='scanner_smaller_component_h5'>Scanner Speed: {value.scannerSpeed.toString()} m/s</h5>
                                        <h5 className='scanner_smaller_component_h5'>Status: {(JSON.parse(value.isAvailable as string)) ? "Available" : "Engaged"}</h5>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    })

                    }
                </div>
                                 
                </>
                :
                <>
                <h2 className='form_main_container_header'>Scanning Details</h2>
                <span className='form_main_container_header_underline'></span>
                <div className='form_main_container_components'>
                    <h3 className='form_main_container_components_h3'>Project Name</h3>
                    <div className='form_main_container_components_lower'>
                        <div className='dimensionsError_components'>
                            <h5 className='form_main_container_components_lower_h5'>{projectNameErrorMsg}</h5>
                        </div>
                        <input className={'form_main_container_components_input'+ projectNameErr}
                        placeholder='Enter Project Name'
                        onChange={(event) => handleProjectName(event)}
                        onBlur={checkProjectName}/>
                    </div>
                </div>
                <div className='form_main_container_components'>
                    <h3 className='form_main_container_components_h3'>Scanning Mode</h3>
                    <div className='form_main_container_components_lower'>
                        <div className='dimensionsError_components'>
                            <h5 className='form_main_container_components_lower_h5'>{scanningModeErrorMsg}</h5>
                        </div>
                        <div className='form_dropdown_btn' onBlur={checkScanningMode}>
                            <DropdownBtn PrinterList={scanningModeNames} modeSet={handleScanningMode}/>
                        </div>
                    </div>
                </div>
                <div className='form_main_container_components'>
                    <h3 className='form_main_container_components_h3'>Scan Dimensions (cm)</h3>
                    <div className="dimension_container">
                        <div className='dimensionX_container'>
                            <h4 className='dimension_container_h4'>X</h4>
                            <div className='dimensions_container'>
                                <div className='dimensionsError_components'>
                                    <h5 className='dimensions_container_h5'>{scanDimensionsXErrorMsg}</h5>
                                </div>
                                <input className={'dimension_container_input'+scanDimensionsXErr}
                                placeholder='Enter Value'
                                onChange={(event) => handleDimensionsX(event)}
                                onBlur={checkDimensionsX}/>
                            </div>
                        </div>
                        <div className='dimensionY_container'>
                            <h4 className='dimension_container_h4'>Y</h4>
                            <div className='dimensions_container'>
                                <div className='dimensionsError_components'>
                                    <h5 className='dimensions_container_h5'>{scanDimensionsYErrorMsg}</h5>
                                </div>
                                <input className={'dimension_container_input'+scanDimensionsYErr}
                                placeholder='Enter Value'
                                onChange={(event) => handleDimensionsY(event)}
                                onBlur={checkDimensionsY}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_main_container_components'>
                    <h3 className='form_main_container_components_h3'>Scanner Frequency (GHz)</h3>
                    <div className='form_main_container_components_lower'>
                        <div className='dimensionsError_components'>
                           <h5 className='form_main_container_components_lower_h5'>{scannerFrequencyErrorMsg}</h5>
                        </div>
                        <input className={'form_main_container_components_input'+scannerFrequencyErr}
                        placeholder='Enter (To 1 d.p.)'
                        onChange={(event) => handleScannerFrequency(event)}
                        onBlur={checkScannerFrequency}/>
                    </div>
                </div>
                <div className='form_main_container_components'>
                    <button className='form_main_container_submit_btn'
                    disabled={btnDisabled}
                    onClick={(event) => submitForm(event)}>Submit</button>
                </div>
                </>
            }
            </div>
        </div>
  )
}

export default InputForm