"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": ["10:37:49"],
            "answer": ".- .... : .-- .--- : -.. -..-",
            "explanation": "103749"
        },
        {
            "input": ["21:34:56"],
            "answer": "-. ...- : .-- .-.. : -.- .--.",
            "explanation": "213456"
        },
        {
            "input": ["00:1:02"],
            "answer": ".. .... : ... ...- : ... ..-.",
            "explanation": "000102"
        },
        {
            "input": ["23:59:59"],
            "answer": "-. ..-- : -.- -..- : -.- -..-",
            "explanation": "235959"
        },
        {
            "input": ["0:10:2"],
            "answer": ".. .... : ..- .... : ... ..-.",
            "explanation": "001002"
        },
    ],
    "Extra": [
        {
            "input": ["17:0:28"],
            "answer": ".- .--- : ... .... : .-. -...",
            "explanation": "170028"
        },
        {
            "input": ["7:41:37"],
            "answer": ".. .--- : -.. ...- : .-- .---",
            "explanation": "074137"
        },
        {
            "input": ["4:25:13"],
            "answer": ".. .-.. : .-. .-.- : ..- ..--",
            "explanation": "042513"
        },
        {
            "input": ["15:18:8"],
            "answer": ".- .-.- : ..- -... : ... -...",
            "explanation": "151808"
        },
        {
            "input": ["2:32:41"],
            "answer": ".. ..-. : .-- ..-. : -.. ...-",
            "explanation": "023241"
        },
        {
            "input": ["9:44:31"],
            "answer": ".. -..- : -.. .-.. : .-- ...-",
            "explanation": "094431"
        },
        {
            "input": ["3:8:2"],
            "answer": ".. ..-- : ... -... : ... ..-.",
            "explanation": "030802"
        },
        {
            "input": ["5:1:9"],
            "answer": ".. .-.- : ... ...- : ... -..-",
            "explanation": "050109"
        },
        {
            "input": ["09:02:08"],
            "answer": ".. -..- : ... ..-. : ... -...",
            "explanation": "090208"
        },
        {
            "input": ["13:5:3"],
            "answer": ".- ..-- : ... .-.- : ... ..--",
            "explanation": "130503"
        },
    ]
}
