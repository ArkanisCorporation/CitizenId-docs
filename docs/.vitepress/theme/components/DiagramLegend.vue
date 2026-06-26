<template>
  <details class="details custom-block cid-diagram-legend">
    <summary>Diagram legend details</summary>
    <p>
      The diagrams use the same shapes, colors, and edge styles across the documentation.
    </p>

    <div
      class="cid-diagram-legend__panel"
      role="img"
      aria-label="Diagram legend showing the shared node types and edge types used in Citizen iD documentation diagrams."
    >
      <section class="cid-diagram-legend__section">
        <h4>Node meanings</h4>
        <div class="cid-diagram-legend__node-groups">
          <div class="cid-diagram-legend__node-group">
            <h5>People and surfaces</h5>
            <div class="cid-diagram-legend__node-items">
              <div class="cid-legend-node cid-legend-node--actor">
                <span>Actor</span>
              </div>
              <div class="cid-legend-node cid-legend-node--context">
                <span>Context</span>
              </div>
            </div>
          </div>

          <div class="cid-diagram-legend__node-group">
            <h5>Data</h5>
            <div class="cid-diagram-legend__node-items">
              <div class="cid-legend-node cid-legend-node--data">
                <span>Data</span>
              </div>
              <div class="cid-legend-node cid-legend-node--storage">
                <span>Stored data</span>
              </div>
            </div>
          </div>

          <div class="cid-diagram-legend__node-group">
            <h5>Flow</h5>
            <div class="cid-diagram-legend__node-items">
              <div class="cid-legend-node cid-legend-node--service">
                <span>Citizen iD service</span>
              </div>
              <div class="cid-legend-node cid-legend-node--action">
                <span>Action</span>
              </div>
              <div class="cid-legend-node cid-legend-node--decision">
                <span>Decision</span>
              </div>
              <div class="cid-legend-node cid-legend-node--caution">
                <span>Boundary</span>
              </div>
            </div>
          </div>

          <div class="cid-diagram-legend__node-group">
            <h5>Outcomes</h5>
            <div class="cid-diagram-legend__node-items">
              <div class="cid-legend-node cid-legend-node--success">
                <span>Success</span>
              </div>
              <div class="cid-legend-node cid-legend-node--blocked">
                <span>Blocked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cid-diagram-legend__section">
        <h4>Edge meanings</h4>
        <div class="cid-diagram-legend__edges">
          <div class="cid-legend-edge">
            <span class="cid-legend-edge__label">Primary path</span>
            <span class="cid-legend-edge__line cid-legend-edge__line--primary" aria-hidden="true" />
            <span class="cid-legend-edge__text">Main expected journey</span>
          </div>
          <div class="cid-legend-edge">
            <span class="cid-legend-edge__label">Normal link</span>
            <span class="cid-legend-edge__line cid-legend-edge__line--normal" aria-hidden="true" />
            <span class="cid-legend-edge__text">Sequence or cause</span>
          </div>
          <div class="cid-legend-edge">
            <span class="cid-legend-edge__label">Dotted link</span>
            <span class="cid-legend-edge__line cid-legend-edge__line--dotted" aria-hidden="true" />
            <span class="cid-legend-edge__text">Later, optional, or boundary path</span>
          </div>
        </div>
      </section>
    </div>
  </details>
</template>
