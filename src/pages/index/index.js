import './index.css'
import IndexTop from "../../components/index/index_top/intex_top";
import IndexMiddle from "../../components/index/index_middle/intex_middle";
import IndexFon from "../../components/index/index_fon/index_fon";
import IndexTariffs from "../../components/index/index_tarifs/index_tarifs";

let Index = () => {
    return (
        <div className={"container"}>
            <IndexTop/>
            <IndexMiddle/>
            <IndexFon/>
            <IndexTariffs/>
        </div>
    )
}

export default Index;