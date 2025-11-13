


--- 

2025-11-12: Claude summary from fleeting note
## Pitch: Why Accept Data Pipelines, Not Just Datasets?

**TL;DR:** We should accept documented, reproducible data pipelines alongside raw datasets. This enables data auditability, interoperability, and better privacy controls—turning Storywrangler from a collection of isolated datasets into an integrated data ecosystem. 

### The Problem with Datasets Alone

Sure, we can accept datasets—someone provides a new book corpus, we analyze it with our tools. **But each dataset lives on its own island.** If our goal is building an integrated data platform (not just a data dump), we need curation and standardization.

### What We're Proposing

Users submit a **documented, reproducible data pipeline** (like [Sam's faculty trajectories repo](https://github.com/samzhang111/faculty-trajectories)) that implements principled data practices. We review and test these pipelines before integrating them into Storywrangler. We 

### Three Key Benefits

#### 1. **Data Auditability**

We can automatically test each pipeline step to ensure:

- Reproducibility (does it actually work?)
- Data provenance (where does this come from?)
- Quality standards (does it meet our criteria?)

**Yes, this limits throughput.** But we'd rather have fewer high-quality datasets than a junkyard. Quality over quantity.

#### 2. **Interoperability**

Instead of accepting arbitrary file formats, pipelines output to **standardized API endpoints that we host**. This means:

- Datasets can reference each other (e.g., link course catalog concepts to Wikipedia pages)
- Unified query language across datasets
- We control the integration layer

Think of it like: we don't just warehouse datasets, we curate an ecosystem where they talk to each other.

#### 3. **Privacy & Access Control**

Here's a big win: **raw data never needs to be materialized publicly.**

For sensitive datasets (e.g., Patrick Ball's human rights data):

- Pipeline lives in private repo
- Raw data stays locked in our secure database
- API endpoints expose only aggregated/processed views
- We manage token-based authentication for access levels

This lets groups share insights without exposing sensitive records.

#### How this benefit our users

Once users have their pipeline accepted, we will promote as a **verifiable and principled data pipeline**. That is, beyond just sharing a datasets into the world, data integrated into the Storywrangler platform will act as a kind of checkmark of reproducibility and auditability. This offers two key benefits to users. First, it becomes an integrated datasets, which can talk to other datasets on the Storywrangler ecosystem. It will become an off-the-shelf datasets ready to analyze with the set of tools developed by the Storywrangler. Second, and with users consent, we will host the data pipelines on the UVM Dataverse platform, where it will be attributed a universal numerical fingerprints. This increases the likelihood of surviving data rot, the fact that most datasets published in papers are ending up broken in one way or another. 

### What This Looks Like in Practice

**Example: Course Catalog Data Pipeline**

Instead of accepting raw PDFs of course catalogs, we'd accept:

1. A GitHub repo with extraction/parsing code
2. Tests that validate output schema
3. Documentation of data sources and cleaning steps
4. API specification for the final endpoint

We review it, run tests, and if approved:

- Pipeline runs on our infrastructure
- Output integrates with our API
- Users query via standardized endpoints
- Pipeline code is public (reproducibility)
- Raw data stays private if needed

### Open Questions

1. **What's our review capacity?** How many pipelines can we realistically evaluate per year?
2. **What are our "principled pipeline" standards?**
    - Version control (Git)
    - Documentation requirements
    - Testing requirements
    - License requirements
3. **Do we run pipelines or just validate them?**
    - Option A: Users run, we just check outputs
    - Option B: We run on our infrastructure (more control, more resources needed)
4. **How does this fit the grant timeline?**
    - Year 1-2: Accept datasets only, design pipeline standards
    - Year 3-4: Pilot pipeline submission with select partners (HRDAG?)
    - Year 5: Open pipeline submission

### Why This Matters for CSSI

This addresses key NSF priorities:

- **FAIR principles**: Pipelines are more Findable, Accessible, Interoperable, Reusable than raw data dumps
- **Reproducibility**: Core scientific value
- **Sustainability**: Community-contributed pipelines = long-term growth
- **Privacy/Security**: Critical for sensitive social science data