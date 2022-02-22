# Product-Review-Service

A service to provide ratings & reviews information to the Atelier web app

## Endpoints
- __GET__ /reviews
  - Query Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | product_id | integer | Specifies the product for which to retrieve reviews |

  - Response: 200 OK
    ```
    [
      {
        id: 1,
        product_id: 1,
        rating: 5,
        date: 2020-07-30T08:41:21.000Z,
        summary: 'This product was great!',
        body: 'I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.',
        recommend: true,
        reported: false,
        reviewer_name: 'funtime',
        reviewer_email: 'first.last@gmail.com',
        response: 'null',
        helpfulness: 9,
        photos: []
      },
      ...
    ]

    ```

- __GET__ /reviews/meta
  - Query Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | product_id | integer | Specifies the product for which to retrieve reviews meta |

  - Response: 200 OK
    ```
    {
      product_id: 3,
      ratings: {},
      recommended: {},
      characteristics: {
        Fit: { id: 6, value: 0 },
        Comfort: { id: 8, value: 0 },
        Length: { id: 7, value: 0 },
        Quality: { id: 9, value: 0 }
      }
    }

    ```

- __PUT__ /reviews/:review_id/helpful
  - Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | review_id | integer | Required ID of the review to update |

  - Response: 204 NO CONTENT

- __PUT__ /reviews/:review_id/report
  - Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | review_id | integer | Required ID of the review to update |

  - Response: 204 NO CONTENT

- __POST__ /reviews
  - Body Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | product_id | integer | Required ID of the product to post the review for |
    | rating | integer | Integer (1-5) indicating the review rating |
    | summary | text | Summary text of the review |
    | body | text | Full text of the review |
    | recommend | bool | Value indicating if the reviewer recommends the product |
    | name | text | Username for reviewer |
    | email | text | Email address for reviewer |
    | photos | [text] | Array of text urls that link to images to be show |
    | characteristics | object | Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...} |

  - Response: 201 CREATED

To start the server locally, fork and clone this repo, and install its dependencies by `npm install` and `npm start`

To test the repo, run `npm test`

To find linting problems, run `npm lint`
