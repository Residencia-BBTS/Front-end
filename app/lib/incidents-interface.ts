interface Incident {
  eventUniqueId: string;
  object: {
    etag: string;
    id: string;
    name: string;
    properties: {
      additionalData: {
        alertProductNames: string[];
        alertsCount: number;
        bookmarksCount: number;
        commentsCount: number;
        tactics: string[];
        techniques: string[];
      };
      alerts: any[]; // Replace 'any' with the appropriate type if you have more information
      bookmarks: any[];
      comments: any[];
      createdTimeUtc: string; // ISO 8601 date string
      description: string;
      firstActivityTimeUtc: string; // ISO 8601 date string
      incidentNumber: string;
      incidentUrl: string;
      labels: string[];
      lastActivityTimeUtc: string; // ISO 8601 date string
      lastModifiedTimeUtc: string; // ISO 8601 date string
      owner: {
        assignedTo: string;
        email: string;
        objectId: string;
        userPrincipalName: string;
      };
      providerIncidentId: string;
      providerName: string;
      relatedAnalyticRuleIds: string[];
      relatedEntities: any[]; // Replace 'any' with the appropriate type if you have more information
      severity: string;
      status: string;
      title: string;
      type: string;
    };
  };
  objectEventType: string;
  objectSchemaType: string;
  workspaceId: string;
  workspaceInfo: {
    ResourceGroupName: string;
    SubscriptionId: string;
    WorkspaceName: string;
  };
}