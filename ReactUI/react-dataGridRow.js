class DataGridRow extends React.Component {
    constructor(props) {
        super(props);
    }



    trigger(type, e, args) {
        var $table = $(e.target.closest('.ui-table'));
        $$.trigger(type, $table, $$.Event({
            actionType: args.actionType,
            data: args.data
        }));
    }
}


window.$$.DataGridRow = DataGridRow;