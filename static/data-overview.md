Buzzwords
- disparate data sources
- data types
- thickness of data (stories versus ngrams)
- big data; swamped by massive datasets. 
- raw data
- maintaining datasets
- data pipelines
- structured data
- (robust) data platform
- data-driven research
- survey data; people provide annotated datasets.
- open data

### Fleeting Notes

2025-11-11

- Providing the right *data model* is a key challenge for a couple of reasons. 
	- We simply define data model as (useful) representation of the data that stands in relationships with some real-world phenomena. 
	- Arguably there is no objective data model; raw data itself is useless. There needs to be work put into any kind of data to be able to extract insights.  Data itself must be understood as such; as the saying goes, no "data makes sense except in the light of evolution" (or something like that).
	- Now, lets focus on the following challenges
		1. `data size and throughput`: Drinking from a fireman hose can be dangerous; similarly, taming big data requires care and resources. 
			- It is understood that the nature of big data coevolve with that of our hardware and software; as chips are becoming smaller and more performant, and laptop increase random access memory, what used to be big is not tiny. As of today, we can decompose big data at least in terms of **storage** and **compute**. 
			- But for all practical purpose, big data is getting big when we are talking about terabytes of data. According to a [recent duckdb user survey](https://duckdb.org/docs/stable/guides/performance/working_with_huge_databases), used by a huge swaths of data engineers, people rarely need to handle big datasets. 56% of people work typically with <16GB while 61% work with 512GB< (see [here](https://duckdb.org/2024/10/04/duckdb-user-survey-analysis#dataset-sizes))., leading duckdb folks to say that [big data is dead](https://motherduck.com/blog/big-data-is-dead/). 
			- Although people often focus on the information aspect of big data, here we also the social and institutional aspect of big data; to get access and analyze big data, one needs resources and expertise that are beyond any given individual.
		2. `data mutation`: people sometimes want to make changes to their dataset; add a feature, clean up a variable name, join. Data mutation might be inversely proportional to data size in that larger datasets already are characterized by impersonal population summarized with a large number of features; think of Twitter. Data mutation can happen, but most likely on some relevant subsets of the full dataset. When doing survey work or supervise machine learning, data engineering is the bread and butter of scientists. 
		3. `data interoperability` (see also [[working-with-APIs]]): in and of itself, any given dataset can be interesting. But how do any data can be merged with additional data is the oil of the information economy. This can be thought as subpoint  to `data mutation`, but here the focus is in providing standard format so that different stakeholders can talk to each other. 
			1. It can be at the API level itself; for instance, [openAPI](https://www.openapis.org/) is a spec that provide a standard description of HTTP APIs; GET, POST, UDPATE, DELETE. 
			2. Or domain-specific, such as with the [openAG alliance](https://openag.io/)(see [this slide deck](https://openag.io/oada-docs/intro/OADA_API_Intro_Trellis.html#1) for an intro). A key point with API is that it can help with decentralizing data sharing in a way that is secure and trustworthy for different stakeholders; everybody just need to agree on a common format, which typically requires institutional process with proper governing bodies.
		4. `data openness`
		5. `ethical data`: underlying text data are people, who might or might not have given the consent for their data to be used. When collecting from afar, we might have a sense of objectivity; but this might be misleading. More of the same data does not equate objectivity, especially when it comes to social media platform where data acquisition is always mediated by some kind of medium that might distort reality. 
		6. `data pipeline maintainability`: 