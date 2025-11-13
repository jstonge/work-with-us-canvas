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


2025-11-12

Here's a few prompts i need to think about:

#### Discussing CompStoryLab projects (§2; ft. Michael)

Similar to how the health team have been doing it; storywrangler (tweets), allotax, ousiometer, 

#### _Submitting (principled) data pipelines not datasets_ (§3? ft. SamZ)

- [[Submitting data pipelines]]

Users should be able to submit (principled) data pipelines not just datasets. Why? What would they look like? What's the problem with just having datasets?

First off, we can totally accept datasets. For instance, people provide a new book and we analyze them with our tools through our tools (storywrangler). This is fine. But this is limited in the following sense; the datasets will each live on their own little island, not talking to each other. If our goal is to build a more integrated data platform, we need some curation process by which datasets are standardized. 

First off, one thing is that it might be easier to just sell it as users "can submit a documented, reproducible data pipeline as part of their dataset submission". That is, users could submit a repo (like Sam's [faculty trajectories one](https://github.com/samzhang111/faculty-trajectories)) implementing PDP (in some form), that we could review and "test" to some degree. Hence, we could have some degree of **data auditability**.

 Obviously, testing and reviewing pipelines will be a limiting factor, but arguably it is better to have fewer, high quality datasets than more junk. Additionally, if we’re happy given some criteria, we could integrate the final output as part of API endpoint, that we would be in charge of hosting. That way, we can improve on the **interoperability** aspect, where we would make our different endpoints talk to each other given a formal standards. This approach reduces the number of datasets, but allow us to potentially build a more integrated data ecosystems.

Another benefit of accepting principled pipelines that integrate with our API is that we can provide some guarantee in terms of data privacy. Say that some groups want to share their data, but don't want to make  it public. One benefit of working with data pipelines is that the raw data don't need to be materialized anywhere; it is locked in on our database and accessible only via the API. The endpoints can then provide more focused, and private data representations of the data. We can manage the token auth process, whereas we provide permission to trusted individuals to access more or less raw datasets.

#### _Deliverables_ (§4.1)

What communication strategies we can use to draw attention from the general public and other researchers to our tools?

- *Not the Pudding:* 
	- We have a scientific core to our data visualization while the Pudding is more journalistic by nature. 
	- Hence, our set of interactive data visualizations builds on top of original work, instead of being reported. For instance, the allotaxonograph is a set of tools unique to our lab, implementing stories based on it go beyond reporting a story. 
	- Additionally, we use our scientific work to drive the story that we tell, as with interactive press releases. We mesh together our scientific works with interactive data essays to communicate original results.  
- *Why scrollytelling as narrative device?*

#### Teaching complex systems via our principled tools in classrooms (§?)




---

2025-11-11

- Providing the right *data model* is a key challenge for a couple of reasons. 
	- We simply define data model as (useful) representation of the data that stands in relationships with some real-world phenomena. 
	- Arguably there is no objective data model; raw data itself is useless. There needs to be work put into any kind of data to be able to extract insights.  Data itself must be understood as such; as the saying goes, no "data makes sense except in the light of evolution" (or something like that).
	- Now, lets focus on the following challenges
		1. `data size and throughput`: Drinking from a fireman hose can be dangerous; similarly, taming big data requires care and resources. 
			- It is understood that the nature of big data coevolve with that of our hardware and software; as chips are becoming smaller and more performant, and laptop increase random access memory, what used to be big is not tiny. As of today, we can decompose big data at least in terms of **storage** and **compute**. 
			- But for all practical purpose, big data is getting big when we are talking about terabytes of data. According to a [recent duckdb user survey](https://duckdb.org/docs/stable/guides/performance/working_with_huge_databases), used by a huge swaths of data engineers, people rarely need to handle big datasets. 56% of people work typically with <16GB while 61% work with 512GB< (see [here](https://duckdb.org/2024/10/04/duckdb-user-survey-analysis#dataset-sizes))., leading duckdb folks to say that [big data is dead](https://motherduck.com/blog/big-data-is-dead/). 
			- Although people often focus on the information aspect of big data, here we also the social and institutional aspect of big data; to get access and analyze big data, one needs resources and expertise that are beyond any given individual.
		2. `data quality`: as already state, having more of the same data is not helpful. But one can have quality dataset without retuning into tiny dataset world (see [FineWeb: high-quality web-scale dataset for LLM pretraining](https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1)). Some big data can be better than others at particular tasks, such as training classifiers.   A few quality comes out of this line of inquiry:
			1. *Base filtering in text analysis*: removing boiler plate, or lower quality data. This is finicky and often depends on the research question.
			2. *Deduplicated datasets* are key to training machine learning models.
		3. `thick data`: this is qualitative data about people; recording their experience, conversation outcomes, feelings, reactions. This typically comes only in small-scale version, as collecting thick data is often unstructured and requires manual labor. One of the largest, arguably more thick data might be something like the [candor corpus](https://www.science.org/doi/10.1126/sciadv.adf3197), containing 1656 conversations recorded in spoken English (1 TB of audio, video, and transcripts, with moment-to-moment measures of vocal, facial, and semantic expression, together with an extensive survey of speakers’ postconversation reflections).
		4. `data mutation`: people sometimes want to make changes to their dataset; add a feature, clean up a variable name, join. Data mutation might be inversely proportional to data size in that larger datasets already are characterized by impersonal population summarized with a large number of features; think of Twitter. Data mutation can happen, but most likely on some relevant subsets of the full dataset. When doing survey work or supervise machine learning, data engineering is the bread and butter of scientists. 
		5. `data interoperability` (see also [[working-with-APIs]]): in and of itself, any given dataset can be interesting. But how do any data can be merged with additional data is the oil of the information economy. This can be thought as subpoint  to `data mutation`, but here the focus is in providing standard format so that different stakeholders can talk to each other. 
			1. It can be at the API level itself; for instance, [openAPI](https://www.openapis.org/) is a spec that provide a standard description of HTTP APIs; GET, POST, UDPATE, DELETE. 
			2. Or domain-specific, such as with the [openAG alliance](https://openag.io/)(see [this slide deck](https://openag.io/oada-docs/intro/OADA_API_Intro_Trellis.html#1) for an intro). A key point with API is that it can help with decentralizing data sharing in a way that is secure and trustworthy for different stakeholders; everybody just need to agree on a common format, which typically requires institutional process with proper governing bodies.
		6. `data openness`: most big datasets--governmental, google, facebook, etc--are also closed. Some used to be more open (twitter) but have since been closed down. Some big-gish datasets exist, e.g. wikipedia, semantic scholar (220M paper metadata, full citation graph, > 15M fully parsed articles, metadata of all sorts), which are freely available but can be finicky to work with.
		7. `ethical data`: underlying text data are people, who might or might not have given the consent for their data to be used. When collecting from afar, we might have a sense of objectivity; but this might be misleading. More of the same data does not equate objectivity, especially when it comes to social media platform where data acquisition is always mediated by some kind of medium that might distort reality. 
		8. `data pipeline maintainability`:


### Misc refs
- https://huggingface.co/datasets/allenai/c4 mentioned in [[FineWeb]] article as old but gold. AllenAI host a 2.3 TB version of the c4 dataset on huggingface.