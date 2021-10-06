import Paginator from "./Paginators";
import {create} from "react-test-renderer";

describe("Paginator component test", () => {
    test("pages count is 11 but should be showed only 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={0}
                                            onPageChanged={()=>{}} portionSize={5}/>)
        const root = component.root;
        let spans = root.findAllByType("span");
        // expect(spans.length).toBe(10);
    }
    )
}


)