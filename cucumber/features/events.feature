Feature: test events creation and listing

    Scenario: Create event with response code 200 OK
        Given An event <request>
        When I send POST request
        Then I get response code 200

        Examples:
            | request                                                                                           |
            | [{"name": "blue","amount": 123,"size": "small"},{"name": "green","amount": 5643,"size": "medium"}]|

    Scenario: Create event with response code 400 Bad Request
        Given An event <request>
        When I send POST request
        Then I get response code 400

        Examples:
            | request  |
            | "test400"|

    Scenario: Create event with response code 404 Not Found
        Given An event <request>
        When I send wrong POST request
        Then I get response code 404

        Examples:
            | request                                                                                           |
            | [{"name": "blue","amount": 123,"size": "small"},{"name": "green","amount": 5643,"size": "medium"}]|

    Scenario: List events
        When I send GET request 
        Then I get response code 200
        And the data from the response is correct
    
    Scenario: List events but receive response code 400 Bad Request
        When I send GET request with wrong headers
        Then I get response code 400
    
    Scenario: List events but receive response code 404 Not Found
        When I send GET request with wrong URL
        Then I get response code 404

