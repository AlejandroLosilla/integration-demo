import { filterUser } from "./filterUser";

const testList = [
    {
        id: "1",
        name: "Pepito"
    },
    {
        id: "2",
        name: "Hugo"
    },
    {
        id: "3",
        name: "Marta"
    },
    {
        id: "4",
        name: "Pepito"
    }
]

describe('filterUser', () => {
    it('should filter an array properly', () => {
        const expectedResult = [{
            id: "1",
            name: "Pepito"
        }, {
            id: "4",
            name: "Pepito"
        }]

        const result = filterUser("Pepito", testList)
        expect(result).toStrictEqual(expectedResult)
    })

    it('should return an empty array when the filter didn\'t match', () => {
        const expectedResult: any[] = []

        const result = filterUser("Sonia", testList)
        expect(result).toStrictEqual(expectedResult)
    })

    it('should return the full list when filter is an empty string', () => {
        const result = filterUser("", testList)
        expect(result).toStrictEqual(testList)
    })
})
