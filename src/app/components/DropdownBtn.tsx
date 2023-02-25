import React, {useState, useRef, useEffect} from 'react'
import './DropdownBtn.css'

type DropdownBtnProps = {
    PrinterList: String[],
    modeSet: (mode:String) => void
}

function DropdownBtn({PrinterList, modeSet}: DropdownBtnProps) {
    const [openDropdown, setOpenDropdown] = useState<Boolean>(false);
    const [dropdownBtnTable, setDropdownBtnTable] = useState<String>("");
    const [selectedMode, setSelectedMode] = useState<String>("Select one");
    const [rotateCarrot, setRotateCarrot] = useState<String>("");
    useEffect(() => {
        setOpenDropdown(false);
        setDropdownBtnTable("");
    },[selectedMode])
    function setMode(value: String) {
        setSelectedMode(value);
        modeSet(value);
        setOpenDropdown(false);
        setDropdownBtnTable("");
        setRotateCarrot("");
    }
    return (
        <div className='DropdownBtn_main_container'>
            <button className={'DropdownBtn_main_container_main_btn'+dropdownBtnTable}
            onClick={() => {
                setOpenDropdown(prevOpenDropdown => !prevOpenDropdown);
                if (dropdownBtnTable == "") {
                    setDropdownBtnTable("_open");
                    setRotateCarrot(" rotate_down");
                } else {
                    setDropdownBtnTable("");
                    setRotateCarrot("");
                }
                
            }}

            onBlur={()=> {
                setDropdownBtnTable("");
                setOpenDropdown(false);
                setRotateCarrot("");
            }}
            >
                <h4 className='DropdownBtn_main_container_main_btn_h4'>{selectedMode}</h4>
                <img src="/images/DownArrow.png"
                className={'dropdown_img'+rotateCarrot}/>
            </button>
            <div className={'DropdownBtn_table' + dropdownBtnTable}>
                {PrinterList && PrinterList.length > 0 && PrinterList.map((value, index) => {
                    if (value == selectedMode) {
                        return (
                            <React.Fragment key={index}>
                                <button className='DropdownBtn_table_list-item'
                                style = {{backgroundColor: "orange"}}
                                    onMouseDown={() => setMode(value)}>
                                    <h4>{value}</h4>
                                </button>
                            </React.Fragment>
                        )
                    } 
                    return (
                        <React.Fragment key={index}>
                            <button className='DropdownBtn_table_list-item'
                                onMouseDown={() => setMode(value)}>
                                <h4>{value}</h4>
                            </button>
                        </React.Fragment>
                    )
                })

                }
            </div>
        </div>
    )
    }

export default DropdownBtn
