
var Alpha = {
    model: [],
    elrVector: [],
    period: 0,

    init: function (model, elrVector) {
        this.model = model;
        this.elrVector = elrVector;
        this.period = 0;
    },

    getEleCount: function () {
        return this.model.length;
    },

    getDimension: function () {
        return this.model[0].length;
    },

    _buildVector: function (DIMENSION) {
        var vDelta = [];
        for (var i = 0; i < DIMENSION; i++) {
            vDelta.push(0.0);
        }
        return vDelta;
    },

    _vDeltaMerge: function (vTarget, vDelta) {
        for (var i = 0; i < vTarget.length; i++) {
            vTarget[i] += vDelta[i];
        }
        return vTarget;
    },

    /**
     * vector relevant function
     */
    _vf: function (vTarget, vSource) {
        var vDelta = [];

        for (var i = 0; i < this.getDimension(); i++) {
            try {
                var elr = eval(this.elrVector[i]);
                vDelta[i] = elr(vTarget, vSource, i);
            }
            catch (err) {
                vDelta[i] = 0;
            }
        }

        return vDelta;
    },

    /**
     * vector state function
     */
    _vsf: function (index) {
        var vDelta = this._buildVector(this.getDimension());
        for (var i = 0; i < this.model.length; i++) {
            vDelta = this._vDeltaMerge(vDelta, this._vf(this.model[index], this.model[i]));
        }
        return vDelta;
    },

    /**
     * matrix state function
     * @returns {Array}
     */
    _sf: function () {
        var vDeltaMatrix = [];

        for (var i = 0; i < this.model.length; i++) {
            var vDelta = this._vsf(i);
            vDeltaMatrix.push(vDelta);
        }

        return vDeltaMatrix;
    },

    go: function () {
        var vDeltaMatrix = this._sf();
        console.log(vDeltaMatrix);

        for (var i = 0; i < this.model.length; i++) {
            this.model[i] = this._vDeltaMerge(this.model[i], vDeltaMatrix[i]);
        }

        this.period += 1;
    }
}

window.ModelAlpha = Alpha;