import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer";


describe("ProfileStatus component", () => {
    test("status from props should be in the component", () => {
        const component = create(<ProfileStatus status={"Test status"} updateUserStatus={() => {
        }}/>)
        const instance = component.getInstance();
        expect(instance?.instance.state.status).toBe("Test status")
    })

    test("after creating span should be displayed with correct status", () => {
        const component = create(<ProfileStatus status={"Test status"} updateUserStatus={() => {
        }}/>)
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    })
    test("after creating input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"Test status"} updateUserStatus={() => {
        }}/>)
        const root = component.root;
        expect(() => {
            let input = root.findByType("input")
        }).toThrow()
    })

    test("after creating span should contain correct status", () => {
        const component = create(<ProfileStatus status={"Test status"} updateUserStatus={() => {
        }}/>)
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("Test status")
    })

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"Test status"} updateUserStatus={() => {
        }}/>)
        const root = component.root;
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input");
        expect(input.props.value).toBe("Test status")
    })
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={"Test status"} updateUserStatus={mockCallback}/>)
        const instance = component.getInstance()
        //@ts-ignore
        instance?.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})