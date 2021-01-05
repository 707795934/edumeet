const files = (state = {}, action) =>
{
	switch (action.type)
	{
		case 'ADD_FILE':
		{
			const { peerId, magnetUri, time } = action.payload;

			const newFile = {
				active    : false,
				type      : 'file',
				progress  : 0,
				files     : null,
				peerId    : peerId,
				magnetUri : magnetUri,
				time      : time ? time : Date.now()
			};

			return { ...state, [magnetUri]: newFile };
		}

		case 'ADD_FILE_HISTORY':
		{
			const { fileHistory } = action.payload;
			const newFileHistory = {};

			// eslint-disable-next-line
			fileHistory.map((file) =>
			{
				// console.log('ADD1', fileHistory);
				const newFile =
				{
					active   : false,
					type     : 'file',
					progress : 0,
					files    : null,
					...file
				};

				newFileHistory[file.magnetUri] = newFile;
			});

			return { ...state, ...newFileHistory };
		}

		case 'SET_FILE_ACTIVE':
		{
			const { magnetUri } = action.payload;
			const file = state[magnetUri];

			const newFile = { ...file, active: true };

			return { ...state, [magnetUri]: newFile };
		}

		case 'SET_FILE_INACTIVE':
		{
			const { magnetUri } = action.payload;
			const file = state[magnetUri];

			const newFile = { ...file, active: false };

			return { ...state, [magnetUri]: newFile };
		}

		case 'SET_FILE_PROGRESS':
		{
			const { magnetUri, progress } = action.payload;
			const file = state[magnetUri];

			const newFile = { ...file, progress: progress };

			return { ...state, [magnetUri]: newFile };
		}

		case 'SET_FILE_DONE':
		{
			const { magnetUri, sharedFiles } = action.payload;
			const file = state[magnetUri];

			const newFile = {
				...file,
				files    : sharedFiles,
				progress : 1,
				// type : 'file',
				// time : Date.now(),
				active   : false,
				timeout  : false
			};

			return { ...state, [magnetUri]: newFile };
		}

		case 'CLEAR_FILES':
			return {};

		default:
			return state;
	}
};

export default files;
