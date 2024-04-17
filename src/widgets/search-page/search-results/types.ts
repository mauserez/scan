export type Doc = {
	ok: {
		dedupClusterId: string;
		attributes: {
			wordCount: number;
			isTechNews: boolean;
			isAnnouncement: boolean;
			isDigest: true;
		};
		content: {
			markup: string;
		};
		source: {
			name: string;
		};
		title: {
			text: string;
		};
		issueDate: string;
		url: string;
	};
};
