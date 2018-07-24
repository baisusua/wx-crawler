module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    const WorldCup = app.model.define('WorldCup', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        match_id: STRING,
        match_name: STRING,
        match_date: DATE,
        match_location: STRING,
        match_one_current_price: INTEGER,
        match_one_origin_price: INTEGER,
        match_two_current_price: INTEGER,
        match_two_origin_price: INTEGER,
        match_three_current_price: INTEGER,
        match_three_origin_price: INTEGER,
        sub_title: STRING,
        created_at: DATE,
        updated_at: DATE
    });

    WorldCup.findMatch = function (match_id) {
        return this.findOne({
            where: {
                match_id: match_id
            }
        });
    }

    WorldCup.updateMacth = function (config) {
        return this.update({
            match_name: config.match_name,
            match_date: config.match_date,
            match_location: config.match_location,
            sub_title: config.sub_title,
            match_one_current_price: config.match_one_current_price,
            match_one_origin_price: config.match_one_origin_price,
            match_two_current_price: config.match_two_current_price,
            match_two_origin_price: config.match_two_origin_price,
            match_three_current_price: config.match_three_current_price,
            match_three_origin_price: config.match_three_origin_price
        }, {
            where: {
                match_id: config.match_id
            }
        });
    }
    WorldCup.findAllList = function () {
        return this.findAll();
    }
    return WorldCup;
};